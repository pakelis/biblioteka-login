import React, { useEffect, useState } from "react";
import { firebase } from "./firebase.js"; //Firebase API import

//Using context API to share data in all components, later we use useContext hook to use that data
export const AuthContext = React.createContext();

//we create our Provider component that will actually store our athentication status
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser); //?
    //onAuthStateChanged everytime there's some kind of auth state change, we fire setCurrentUser
    //We update our user everytime authethication status is changed
    // console.log(`current user ${currentUser}`)
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
      {console.log(`children - ${children}`)}
    </AuthContext.Provider>
  );
};
