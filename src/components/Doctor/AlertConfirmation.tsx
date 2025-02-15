import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../components/ui/alert-dialog";
  
  type ConfirmDialogProps = {
    message: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    isCancelLoading : boolean
    onConfirm: () => void;
    onCancel?: () => void;
    trigger: React.ReactNode;
    color : string 
  };
  
  const ConfirmDialog = ({
    message,
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    isCancelLoading,
    onConfirm,
    onCancel,
    trigger,
    color,
  }: ConfirmDialogProps) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{message}</AlertDialogTitle>
            {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
            <AlertDialogAction className={color} onClick={onConfirm}>{isCancelLoading? <span className="loading loading-ring loading-md"></span>  : confirmText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default ConfirmDialog;
  