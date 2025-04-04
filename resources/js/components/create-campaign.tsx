import { Description } from "@radix-ui/react-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogCancel } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { AlertDescription } from "./ui/alert";

export function CreateCampaign() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Create a campaign</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create a new campaign</AlertDialogTitle>
                    <AlertDescription>Please fill in the fields below</AlertDescription>
                </AlertDialogHeader>
                <div>
                    <form>
                        <label>Title</label>
                        <input
                            placeholder="asd"
                        >
                        </input>
                    </form>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}