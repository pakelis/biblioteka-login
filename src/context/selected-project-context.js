import React, { useContext, createContext, useState } from "react";
import { useProjects } from "../hooks";

export const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState("INBOX"); // if we dont have project set, it will go straight to the INBOX
  const [selectedProjectColor, setSelectedProjectColor] = useState(null);

  return (
    <SelectedProjectContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        selectedProjectColor,
        setSelectedProjectColor
      }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
