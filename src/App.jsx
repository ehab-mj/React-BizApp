import "./App.css";
import { createContext, useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import LoginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";
import filterContext from "./store/filterContext";
import usersContext from "./store/usersContext";
export const RecoveryContext = createContext();
function App() {
  const [login, setLogin] = useState(null);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [CopyCard, setCardsCopy] = useState([]);

  const [UserInfo, setuserInfo, userCopy, setUserCopy] = useState([]);
  return (
    <usersContext.Provider
      value={{ userCopy, setUserCopy, UserInfo, setuserInfo }}
    >
      <filterContext.Provider
        value={{ dataFromServer, setDataFromServer, setCardsCopy, CopyCard, }}
      >
        <LoginContext.Provider value={{ login, setLogin }}>
          <ToastContainer />
          <LayoutComponent>
            <Router />
          </LayoutComponent>
        </LoginContext.Provider>
      </filterContext.Provider>
    </usersContext.Provider>

  );
}

export default App;
