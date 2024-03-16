import { useContext, useMemo } from "react";
import filterContext from "../store/filterContext";
import LoginContext from "../store/loginContext"
import normalizeFav from "../services/normalizeLike";;
const useDataCard = () => {
  const { login } = useContext(LoginContext);
  const { dataFromServer } = useContext(filterContext);
  const CardFav = useMemo(() => {
    return normalizeFav(dataFromServer, login ? login._id : undefined);
  }, [dataFromServer, login]);

  return CardFav;
};

export default useDataCard;
