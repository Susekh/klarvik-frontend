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
    <section className="p-2">
        <h2 className="text-2xl text-red-600 pb-4">DASHBOARD</h2>
        <div>
        <div className="mb-4">
            <p>
                {`${user.userData?.name}`}
            </p>
        </div>
        <div className="flex flex-wrap gap-4">
            <div className="p-8 border-2 border-rose-300 rounded-lg">
                <ul className="flex flex-col gap-2">
                {
                    user.userData?.projects ?  
                    user.userData.projects.map(project => 
                        { return <li>
                                <p onClick={() => handleProjectClick(project.id)} className="bg-rose-200 p-4 cursor-pointer">{project?.name}</p>
                                </li> }) : 
                        <p>No Projects</p>
                }
                </ul>
                
                <div>
                    <CreateProjectModal className="bg-red-600 text-white hover:bg-red-700"/>
                </div>
            </div>
            <div className="p-8 border-2 border-rose-300 rounded-lg">
            {
                user.userData?.projects && user.userData.projects.length > 0 ? (
                    user.userData.projects.map(project =>
                        project.sprints && project.sprints.length > 0 ? (
                            project.sprints.map(sprint => (
                                <p key={sprint.id}>{sprint.name}</p>
                            ))
                        ) : (
                            <p key={project.id}>No active sprints</p>
                        )
                    )
                ) : (
                    <p>No active sprints</p>
                )
            }
            </div>
            {/* Issues Section */}
            <div className="p-8 border-2 border-rose-300 rounded-lg">
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
            </div>
        </div>
        </div>
        
    </section>
  )
}

export default Dashboard