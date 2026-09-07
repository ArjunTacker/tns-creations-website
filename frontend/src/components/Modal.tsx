import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
  wide?: boolean;
}

export function Modal({ open, onClose, children, labelledBy, wide }: ModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${wide ? "max-w-3xl" : "max-w-lg"} glass rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]`}
          >
            <button
              onClick={onClose}
              data-testid="modal-close-button"
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:border-white/25 hover:text-white"
            >
              <X size={16} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
