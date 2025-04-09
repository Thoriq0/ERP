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
  } from "./ui/alert-dialog";

  
export function ButtonDialogDelete({ open, onOpenChange, onDelete }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="max-w-[350px] md:max-w-[600px] rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-5 md:mt-0">
            <AlertDialogCancel onClick={() => onOpenChange(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { 
              onDelete(); // Jalankan aksi delete
              onOpenChange(false); // Tutup dialog setelah delete
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  