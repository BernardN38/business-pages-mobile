import React, { useState } from "react";

const authContext = React.createContext();

export function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login(callBack) {
      return new Promise((res) => {
        setAuthed(true);
        callBack()
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
