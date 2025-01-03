import CreateProjectModal from "@/components/modals/create/CreateProjectModal";
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const user = useSelector((store : RootState) => { return store.user})
    const navigate = useNavigate();
    console.log("User at dashboard ::", user);
    
    const handleProjectClick = (projectId : string) => {
        navigate(`/projects/${projectId}`);
    }

  return (
    <section className="p-2  pb-32 dark:text-white dark:bg-neutral-800">
        <h2 className="text-2xl text-yellow-600">DASHBOARD</h2>
        <div>
        <div className="mb-8 dark:text-gray-300">
            <p>
                {`${user.userData?.name}`}
            </p>
        </div>
        <div className="flex flex-wrap gap-4">
            <div className="p-8 border-2 text-black border-yellow-300 rounded-lg">
                <ul className="flex flex-col gap-2">
                {
                    user.userData?.projects ?  
                    user.userData.projects.map(project => 
                        { return <li>
                                
                                <p onClick={() => handleProjectClick(project.id)} className="bg-yellow-200 rounded-lg hover:bg-yellow-100 p-4 cursor-pointer">{project?.name}</p>
                                </li> }) : 
                        <p>No Projects</p>
                }
                </ul>
                
                <div>
                    <CreateProjectModal className="bg-yellow-600 text-white mt-4 hover:bg-yellow-700"/>
                </div>
            </div>
            <div className="px-8 pb-8 border-2 border-yellow-300 rounded-lg">
                <h2 className="px-4 py-1 mx-auto w-full">sessions</h2>
            {
                user.userData?.projects && user.userData.projects.length > 0 ? (
                    user.userData.projects.map(project =>
                        project.sprints && project.sprints.length > 0 ? (
                            project.sprints.map(sprint => (
                                <p className="px-4 mt-2  hover:cursor-pointer hover:bg-yellow-100 py-2 bg-yellow-200 text-black rounded-md" key={sprint.id}>{sprint.name}</p>
                            ))
                        ) : (
                            <p key={project.id}>No active Session</p>
                        )
                    )
                ) : (
                    <p>No active session</p>
                )
            }
            </div>
            {/* Issues Section */}
            {/* <div className="p-8 border-2 border-yellow-300 rounded-lg">
                {user.userData?.projects?.length ? (
                    user.userData?.projects?.map((project) =>
                        project.members?.length > 0 ? (
                            project.members.map((member) =>
                                member.assignedIssues?.length > 0 ? (
                                    member.assignedIssues.map((issue) => (
                                        <p key={issue.id}>Issue: {issue.name}</p>
                                    ))
                                ) : (
                                    <p key={member.id}>No assigned issues</p>
                                )
                            )
                        ) : (
                            <p key={project.id}>No members in this project</p>
                        )
                    )
                ) : (
                    <p>No active Issues</p>
                )}
            </div> */}
        </div>
        </div>
        
    </section>
  )
}

export default Dashboard