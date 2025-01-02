import conf from "@/conf/conf";
import useApiPost from "@/utils/useApiPost";
import { useNavigate, useParams } from "react-router-dom";
import ContentShimmer from "../loaders/shimmers/ContentShimmer";
import { Button } from "../ui/button";
import CreateSprintModal from "../modals/create/CreateSprintModal";

function Project() {
  const { projectId } = useParams(); 
  const navigate = useNavigate();

  const handleAddMember = () => {
    console.log("Member is to be added");
  }

  
  const { data, isLoading, error } = useApiPost(
    `${conf.backendUrl}/fetch/project`, 
    { projectId }
  );
  const project = data?.project;
  console.log("Project Data ::", data);
  

  
  if (isLoading) return <ContentShimmer/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="dark:bg-neutral-800 dark:text-white px-8 py-2 h-full">
      <h1 className="text-2xl mb-2 font-semibold">Project Details</h1>
      {data ? (
        <div>
            <div className="flex gap-2">
              <img width={30} alt={`${project.name}`} className="image border-2 border-yellow-500 rounded-full w-8 h-8" src={project.imageUrl} />
              <h2 className="px-2 py-1 bg-yellow-300 text-center overflow-hidden rounded-lg h-8 w-36">{project.name}</h2>
            </div>
            <div className="py-8">
              <div className="flex gap-4">
                <ul className="flex border-2 p-2 flex-col gap-4">
                  {
                    project.members.length ? 
                    project.members.map((member : any) => (
                      <li className="border-2 ">
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                      </li>
                    ))
                    : 
                    <Button onClick={handleAddMember}>No members. click to add</Button> 
                  }
                </ul>
                <div className="flex border-2 p-2 flex-col gap-2">
                <CreateSprintModal className="bg-yellow-600 text-white hover:bg-yellow-700" projectId={project.id}/>
                <ul className="flex flex-col gap-4">
                    {
                      project?.sprints ? 
                      project.sprints.map((sprint : any) => (
                        <li onClick={() => navigate(`sprints/${sprint.id}`)} className="border-2 bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600 duration-300 p-4 rounded-md">
                          <h3>{sprint.name}</h3>
                          <p>{sprint.id}</p>
                          <p>{`from ${sprint.startDate} to ${sprint.endDate}`}</p>
                          <p>{`status :: ${sprint.status}`}</p>
                        </li>
                        
                      ))
                      : 
                      <CreateSprintModal className="bg-yellow-600 text-white hover:bg-yellow-700" projectId={project.id}/>
                    }
                  </ul>
                </div>
                
              </div>
            </div>
        </div>

      ) : (
        <p>No project data available.</p>
      )}
    </section>
  );
}

export default Project;
