import { useEffect, useState } from "react";
import { Root } from "./types/ShowCases";
import ProjectComp from "./components/ProjectComp";
import FadeIn from "react-fade-in/lib/FadeIn";

function App() {
  const [projects, setProjects] = useState<Root>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      });
  }

  useEffect(() => {
    fetchProjects();
  }, []);

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
