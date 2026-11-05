/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

const cardGLB = "/card.glb";
const lanyardTexture = "/lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent, antialias: true }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(
            new THREE.Color(0x000000),
            transparent ? 0 : 1
          );
        }}
      >
        <ambientLight intensity={2} />

        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={3}
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />

          <Lightformer
            intensity={3}
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band() {
  const band = useRef<THREE.Mesh | null>(null);

  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardTexture);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
  }, []);

  const meshLineGeometry = useMemo(
    () => new MeshLineGeometry(),
    []
  );

  const meshLineMaterial = useMemo(() => {
    return new MeshLineMaterial({
      color: new THREE.Color("white"),
      depthTest: false,
      resolution: new THREE.Vector2(1000, 1000),
      useMap: true,
      map: texture,
      repeat: new THREE.Vector2(-4, 1),
      lineWidth: 1,
    } as any);
  }, [texture]);

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? "grabbing"
        : "grab"
      : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  // Physics joints
  useRopeJoint(fixed, j1, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);

  useRopeJoint(j1, j2, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);

  useRopeJoint(j2, j3, [
    [0, 0, 0],
    [0, 0, 0],
    1,
  ]);

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  // IMPORTANT: useFrame yahan component ke ANDAR hai
  useFrame((state, delta) => {
    // Wait until all refs are ready
    if (
      !band.current ||
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current
    ) {
      return;
    }

    // Dragging
    if (dragged) {
      vec.set(
        state.pointer.x,
        state.pointer.y,
        0.5
      ).unproject(state.camera);

      dir
        .copy(vec)
        .sub(state.camera.position)
        .normalize();

      vec.add(
        dir.multiplyScalar(
          state.camera.position.length()
        )
      );

      [card, j1, j2, j3, fixed].forEach((ref) => {
        ref.current?.wakeUp?.();
      });

      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    // Smooth rope points
    [j1, j2].forEach((ref) => {
      const currentPosition = ref.current.translation();

      if (!ref.current.lerped) {
        ref.current.lerped = new THREE.Vector3(
          currentPosition.x,
          currentPosition.y,
          currentPosition.z
        );
      }

      ref.current.lerped.lerp(
        new THREE.Vector3(
          currentPosition.x,
          currentPosition.y,
          currentPosition.z
        ),
        Math.min(delta * 10, 1)
      );
    });

    // Update curve
    const p3 = j3.current.translation();
    const p2 = j2.current.lerped;
    const p1 = j1.current.lerped;
    const p0 = fixed.current.translation();

    // Extra safety: prevent NaN
    if (
      !Number.isFinite(p3.x) ||
      !Number.isFinite(p3.y) ||
      !Number.isFinite(p3.z)
    ) {
      return;
    }

    curve.points[0].set(p3.x, p3.y, p3.z);
    curve.points[1].copy(p2);
    curve.points[2].copy(p1);
    curve.points[3].set(p0.x, p0.y, p0.z);

    meshLineGeometry.setPoints(curve.getPoints(32));

    // Card rotation physics
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());

    card.current.setAngvel({
      x: ang.x,
      y: ang.y - rot.y * 0.25,
      z: ang.z,
    });
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Fixed top point */}
        <RigidBody
          ref={fixed}
          type="fixed"
          colliders={false}
        />

        {/* Rope joints */}
        <RigidBody
          ref={j1}
          position={[0.5, 0, 0]}
          colliders={false}
          angularDamping={4}
          linearDamping={4}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={j2}
          position={[1, 0, 0]}
          colliders={false}
          angularDamping={4}
          linearDamping={4}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={j3}
          position={[1.5, 0, 0]}
          colliders={false}
          angularDamping={4}
          linearDamping={4}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Actual card */}
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          colliders={false}
          angularDamping={4}
          linearDamping={4}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(e: any) => {
              e.stopPropagation();

              e.target.setPointerCapture?.(
                e.pointerId
              );

              const cardPosition =
                card.current.translation();

              setDragged(
                new THREE.Vector3(
                  e.point.x - cardPosition.x,
                  e.point.y - cardPosition.y,
                  e.point.z - cardPosition.z
                )
              );
            }}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture?.(
                e.pointerId
              );

              setDragged(false);
            }}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={materials?.base?.map}
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}

            {nodes?.clip?.geometry && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials?.metal}
              />
            )}

            {nodes?.clamp?.geometry && (
              <mesh
                geometry={nodes.clamp.geometry}
                material={materials?.metal}
              />
            )}
          </group>
        </RigidBody>
      </group>

      {/* Visual rope */}
      <mesh
        ref={band}
        geometry={meshLineGeometry}
        material={meshLineMaterial}
      />
    </>
  );
}

// Preload the 3D model
useGLTF.preload("/card.glb");