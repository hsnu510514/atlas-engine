import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface AboutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function AboutDialog({ open, onOpenChange, children }: AboutDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="about-overlay" />
        <Dialog.Content className="about-content">
          <Dialog.Close asChild>
            <button type="button" className="about-close" aria-label="關閉">
              <X size={16} />
            </button>
          </Dialog.Close>
          <Dialog.Title className="sr-only">關於</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
