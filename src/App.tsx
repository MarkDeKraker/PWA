import { useEffect, useState } from "react";
import { Root } from "./types/ShowCases";
import ProjectComp from "./components/ProjectComp";

function App() {
  const [projects, setProjects] = useState<Root>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  function fetchProjects() {
    setIsLoading(true);
    fetch(`https://cmgt.hr.nl/api/projects`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setProjects(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="flex justify-center my-2">
        {isLoading && <div>Loading....</div>}
        <div className="grid grid-cols-2 gap-2">
          {projects?.data.map((project) => (
            <ProjectComp key={project.project.id} project={project.project} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
