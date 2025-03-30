
// Re-export from sonner for backwards compatibility
import { toast as sonnerToast } from "sonner";
import { CustomToastProps } from "@/hooks/use-toast";

// Create compatibility layer for existing code
export const useToast = () => ({
  toast: (props?: CustomToastProps) => {
    if (props) {
      const { title, description, variant } = props;
      if (variant === "destructive") {
        return sonnerToast.error(title, { description });
      }
      return sonnerToast(title, { description });
    }
    return {};
  },
  dismiss: (toastId?: string) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
    } else {
      sonnerToast.dismiss();
    }
  },
  toasts: []
});

// Toast function that matches the interface expected by the codebase
export const toast = (props?: CustomToastProps) => {
  if (props) {
    const { title, description, variant } = props;
    if (variant === "destructive") {
      return sonnerToast.error(title, { description });
    }
    return sonnerToast(title, { description });
  }
  
  // Return methods when called without arguments
  return {
    error: (title?: string, options?: any) => sonnerToast.error(title, options),
    success: (title?: string, options?: any) => sonnerToast.success(title, options),
    warning: (title?: string, options?: any) => sonnerToast.warning(title, options),
    info: (title?: string, options?: any) => sonnerToast.info(title, options),
  };
};

// Add additional methods to match the existing interface
toast.error = (title?: string, options?: any) => sonnerToast.error(title, options);
toast.success = (title?: string, options?: any) => sonnerToast.success(title, options);
toast.warning = (title?: string, options?: any) => sonnerToast.warning(title, options);
toast.info = (title?: string, options?: any) => sonnerToast.info(title, options);
