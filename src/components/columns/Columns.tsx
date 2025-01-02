import { useEffect, useState } from "react";
import CreateTasksModal from "../modals/create/CreateTasksModal";
import DeleteTaskModal from "../modals/delete/DeleteTasksModal";
import { Button } from "../ui/button";

type Props = {
    columns : any;
    projectId : string;
    setSprint : any;
}

function Columns( { columns, setSprint, projectId } : Props) {

  const [karlCol, setKalrCol] = useState(columns);

  useEffect(() => {
    setKalrCol(columns);
  }, [columns])
  
  return (
    <div className="flex flex-wrap gap-4">
        {
            karlCol.map((column: any) => (
                <ul className="border-2 dark:border-neutral-500 rounded-lg mt-4 p-4" key={column.id}>
                  <h2 className="pb-2">{column.name}</h2>
                  {
                    column?.tasks ? 
                    column.tasks.map((task : any) => (
                      <li className="border-2 flex gap-8 border-gray-600 rounded-md bg-neutral-900 p-4 mb-2" key={task.id}>
                        <div>
                        <p>{task.name}</p>
                        <p className="text-gray-400">{task.content}</p>
                        <Button className={`${task.status === "normal"? "bg-green-300" : "bg-yellow-800"} px-2 dark:text-white dark:hover:text-black py-1 mt-4 rounded-xl`}>{task.status? task.status : "status"}</Button>
                        </div>
                        
            
                        <div className="mt-2 ml-auto">
                          <DeleteTaskModal 
                            className="bg-neutral-600 hover:bg-red-600 text-white w-1 h-2" 
                            taskId={task.id} 
                            setSprint={setSprint}
                            setKalrCol={setKalrCol} 
                            onClose={() => {}}
                          />
                        </div>
                      </li>
                    )) : 
                    (<div className="border-2 p-2">
                      <p className="mb-2">No workers here</p>
                      <CreateTasksModal className="p-2 bg-yellow-600" setKalrCol={setKalrCol} setSprint={setSprint} columns={columns} projectId={projectId} columnId={column.id}/>
                    </div>)
                  }
                  <div className="border-2 border-gray-600 rounded-md p-4 ">
                      <p className="mb-2">Add new worker</p>
                      <CreateTasksModal className="p-2 bg-yellow-600" setKalrCol={setKalrCol} setSprint={setSprint} columns={columns} projectId={projectId} columnId={column.id}/>
                  </div>
                </ul>
            ))
        }
    </div>
  )
}

export default Columns