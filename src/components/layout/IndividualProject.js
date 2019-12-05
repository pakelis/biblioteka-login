import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useProjectsValue, useSelectedProjectValue } from "../../context";
import { firebase } from "../../firebase";

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]); // we spread all the projects, so it triggers our setProjects , that refreshes everytime there change in projects
        setSelectedProject("INBOX");
      });
  };
};
