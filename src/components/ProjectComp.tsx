import { Project } from "../types/ShowCases";

export default function ProjectComp({ project }: { project: Project }) {
  return (
    <div className="border-2 max-w-xs rounded-lg p-2 h-25 shadow-md">
      <div className="font-medium">{project.title}</div>
      <div>{project.tagline}</div>
    </div>
  );
}
