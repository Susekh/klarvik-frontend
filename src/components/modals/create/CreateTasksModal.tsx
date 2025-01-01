import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { FormEvent,  useState } from "react";
import callApiPost from "@/utils/callApiPost";
import conf from "@/conf/conf";

type Props = {
    className : string;
    columnId : string;
    projectId : string;
    setSprint : any;
}

function CreateTasksModal({ className, columnId, setSprint, projectId } : Props) {

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [deadline, setDeadline] = useState("");

    const createProject = async (e : FormEvent) => {
        
        e.preventDefault();

        const res = await callApiPost(`${conf.backendUrl}/create/task/newTask`, {name, content, deadline, columnId, projectId});
        console.log("res from backend ::", res);
        
        setSprint(res?.data?.sprint);

        setName("");
        setContent("");
        
      };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className={className} variant="outline">Create Item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new item</DialogTitle>
            <DialogDescription>Fill up details for your new Item</DialogDescription>
          </DialogHeader>
          <form onSubmit={createProject} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                Content
                </Label>
                <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                End Date
                </Label>
                <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="col-span-3"
                />
            </div>
            <DialogFooter>
              <Button type="submit">Add item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateTasksModal;
