import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../ui/dialog";
import { FormEvent, useState } from "react";
import callApiPost from "@/utils/callApiPost";
import conf from "@/conf/conf";
import { LucideDelete } from "lucide-react";

type Props = {
    className: string;
    taskId: string;
    setSprint?: any;
    setKalrCol : any;
    onClose: () => void;
};

function DeleteTaskModal({ className, taskId, setKalrCol, onClose }: Props) {
    const [loading, setLoading] = useState(false);

    const deleteTask = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await callApiPost(`${conf.backendUrl}/delete/task/delete-tasks`, { taskId });
            setKalrCol(res?.data?.columns);
            console.log("Response at Delete Tasks ::", res);
            
            onClose();
        } catch (error) {
            console.error("Error deleting task:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={className} variant="outline"><LucideDelete/></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this task? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={deleteTask} className="grid gap-4 py-4">
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit" isLoading={loading} variant="destructive">
                                {loading ? "Deleting..." : "Delete Task"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DeleteTaskModal;
