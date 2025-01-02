import { useParams } from "react-router-dom";
import conf from "@/conf/conf";
import useApiPost from "@/utils/useApiPost";
import ContentShimmer from "../loaders/shimmers/ContentShimmer";
import { useState, useEffect } from "react";
import callApiPost from "@/utils/callApiPost";
import Columns from "../columns/Columns";

function Sprint() {
  const { sprintId } = useParams(); 
  const [sprint, setSprint] = useState(null);

  // Fetch the sprint data using the sprintId
  const { data, isLoading, error } = useApiPost(
    `${conf.backendUrl}/fetch/sprint`,
    { sprintId }
  );

  // Update sprint state when data changes
  useEffect(() => {
    if (data?.sprint) {
      setSprint(data.sprint);
    }
  }, [data]);

  const CreateColumn = async () => {
    try {
      // Call the API to create the column
      const res = await callApiPost(
        `${conf.backendUrl}/create/column/newColumn`,
        { sprintId, name: "Task" } // Default column name "Todo"
      );
  
      // Check the response and update the state
      if (res?.data?.sprint) {
        setSprint(res.data.sprint); // Update the sprint state with the new data
        console.log("Updated Sprint after creating column:", res.data.sprint);
      } else {
        console.error("Failed to update columns:", res);
      }
    } catch (err) {
      console.error("Error creating column:", err);
    }
  };
  

  // Handle loading and error states
  if (isLoading) return <ContentShimmer />;
  if (error) return <p>Error: {error.message || "An error occuryellow."}</p>;

  return (
    <section className="dark:bg-neutral-800 dark:text-white px-8 py-2 h-full">
      <h1 className="text-2xl mb-2 font-semibold">Session Details</h1>
      {sprint ? (
        <div>
          <h2 className="text-lg font-medium">{sprint.name}</h2>
          <p>{`Session ID: ${sprintId}`}</p>
          <p>{`Session Date: ${new Date(sprint.startDate).toLocaleDateString()}`}</p>
          <p>{`End Date: ${new Date(sprint.endDate).toLocaleDateString()}`}</p>
          <p>{`Status: ${sprint.status}`}</p>
          <div className="mt-4">
            <h3 className="text-md font-semibold">Tasks :</h3>
              {
              sprint.columns.length ? 
              <Columns setSprint={setSprint}  columns={sprint.columns}  projectId={sprint.projectId} /> : (
                <p>No Task available.</p>
              )}
            <button
              onClick={CreateColumn}
              className="bg-yellow-500 p-2 text-white rounded-lg mt-4"
            >
              Add Task
            </button>
          </div>
        </div>
      ) : (
        <p>No Sessions data available.</p>
      )}
    </section>
  );
}

export default Sprint;
