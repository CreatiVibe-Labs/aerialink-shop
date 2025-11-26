"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LoginAlertModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginAlertModal({ open, onClose }: LoginAlertModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center font-font-albert-sans">
            Please Login
          </DialogTitle>
        </DialogHeader>

        <div className="text-center text-sm text-[#AFB1AE] px-4 font-font-albert-sans">
          You must be logged in to perform this action.
        </div>

        <DialogFooter className="flex justify-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-lg px-6 text-sm cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            className="rounded-lg bg-primary text-white cursor-pointer hover:bg-primary/80 px-6 text-sm"
          >
            Login Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
