
import { toast as sonnerToast } from "sonner";

// Define our own interface with the properties we need
export interface CustomToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Create toast function that accepts props
export const toast = (props?: CustomToastProps) => {
  if (props) {
    const { title, description, variant } = props;
    if (variant === "destructive") {
      return sonnerToast.error(title, { description });
    }
    return sonnerToast(title, { description });
  }
  
  // Return an object with methods when no args provided
  return {
    error: (title?: string, options?: any) => sonnerToast.error(title, options),
    success: (title?: string, options?: any) => sonnerToast.success(title, options),
    warning: (title?: string, options?: any) => sonnerToast.warning(title, options),
    info: (title?: string, options?: any) => sonnerToast.info(title, options),
  };
};

// Create useToast hook for compatibility with existing code
export const useToast = () => {
  return {
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
  };
};
