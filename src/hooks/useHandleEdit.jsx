import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import filterContext from "../store/filterContext";
import ROUTES from "../routes/ROUTES";
import Typography from "@mui/material/Typography";
import { getToken } from "../services/storageService";
import { Slide, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const useHandleEditCard = () => {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const { dataFromServer } = useContext(filterContext);

  const handleEditClick = (id) => {
    if (!login) {
      toast.info('👷‍♂️ You Successfuly Edited the Card', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    let token = getToken();
    let UserData = jwtDecode(token);

    if (!id || !dataFromServer || !login) {
      return;
    }
    if (dataFromServer && dataFromServer.length > 0) {
      const card = dataFromServer.find((item) => item._id === id);
      if (card && ((login && login.isBusiness && card.user_id === UserData._id) ||
        (login && login.isAdmin))
      ) {
        navigate(`${ROUTES.EDITCARD}/${id}`);
      }
    } else {
      return <Typography>Could not find any items here</Typography>;
    }
  };

  return { handleEditClick };
};

export default useHandleEditCard;
