import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DialogeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialoge: React.FC<DialogeProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            Send me a message or reach out directly through my socials.
          </DialogDescription>
        </DialogHeader>
        {/* Add your form or content here */}
      </DialogContent>
    </Dialog>
  )
}

export default Dialoge