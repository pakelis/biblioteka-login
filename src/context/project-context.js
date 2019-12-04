import React, { createContext, useContext } from "react";
import { useProjects } from "../hooks";

export const ProjectsContext = createContext(); // we create context that we use as a ProjectsContext.Provider
export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);

// const {projects} = useProjectsValue()
// this is how it would work, we get the {projects} from hook, and we use it with useProjectsValue
//timestamp 1:46
