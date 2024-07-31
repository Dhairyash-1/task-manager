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
} from "@/components/ui/alert-dialog"
import { useModal } from "@/context"
import { MouseEventHandler } from "react"

const CustomAlertDialog = ({ create }: { create: Function }) => {
  const { closeModal, openDialog, closeDialog, isDialogOpen } = useModal()
  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent className="bg-[#f7f7f7] text-[#000000]">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to save changes.</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              closeDialog()
              closeModal()
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              create()
              closeDialog()
              closeModal()
            }}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomAlertDialog
