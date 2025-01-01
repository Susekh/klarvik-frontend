import CreateTasksModal from "../modals/create/CreateTasksModal";
import DeleteTaskModal from "../modals/delete/DeleteTasksModal";

type Props = {
    columns : any;
    projectId : string;
    setSprint : any;
}

function Columns( { columns, setSprint, projectId } : Props) {

  console.log("Columns ::", columns);
  
  return (
    <div className="flex flex-wrap gap-4">
        {
            columns.map((column: any) => (
                <ul className="border-2 p-4" key={column.id}>
                  <h2 className="pb-2">{column.name}</h2>
                  {
                    column?.tasks ? 
                    column.tasks.map((task : any) => (
                      <li className="border-2 p-2 mb-2" key={task.id}>
                        <p>{task.name}</p>
                        <p>{task.content}</p>
            
                        <div className="mt-2">
                          <DeleteTaskModal 
                            className="bg-red-600 text-white p-2" 
                            taskId={task.id} 
                            setSprint={setSprint} 
                            onClose={() => {}}
                          />
                        </div>
                      </li>
                    )) : 
                    (<div className="border-2 p-2">
                      <p className="mb-2">No tasks here</p>
                      <CreateTasksModal className="p-2 bg-red-600" setSprint={setSprint} columns={columns} projectId={projectId} columnId={column.id}/>
                    </div>)
                  }
                  <div className="border-2 p-2">
                      <p className="mb-2">Add new Task</p>
                      <CreateTasksModal className="p-2 bg-red-600" setSprint={setSprint} columns={columns} projectId={projectId} columnId={column.id}/>
                  </div>
                </ul>
            ))
        }
    </div>
  )
}

export default Columns