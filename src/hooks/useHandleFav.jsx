import axios from "axios";
import { useContext } from "react";
import { Flip, Slide, toast } from "react-toastify";
import filterContext from "../store/filterContext";
const useHandleFavClick = () => {
  const { setDataFromServer } = useContext(filterContext);
  const handleFavClick = async (id) => {

    try {
      let { data } = await axios.patch("/cards/" + id);
      setDataFromServer((currentDataFromServer) => {
        let CardForm = currentDataFromServer.findIndex(
          (card) => card._id === id
        );
        console.log(CardForm);
        if (CardForm >= 0) {
          currentDataFromServer[CardForm] = data;
        }
        return [...currentDataFromServer];
      });
      toast.success("Check your cards in favorites", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } catch (err) {
      toast.error("Failed to add to favorites", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };
  return {
    handleFavClick,
  };
};

export default useHandleFavClick;
