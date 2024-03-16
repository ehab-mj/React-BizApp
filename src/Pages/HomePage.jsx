import { Grid, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardComponent from "../Component/CardComponent";
import PageHeader from "../Layout/header/PageHeader";
import useHandleEditCard from "../hooks/useHandleEdit";
import useHandleFavClick from "../hooks/useHandleFav";
// import normalizeFav from "../services/normalizeFavs";
import filterContext from "../store/filterContext";
import useDataCard from "../hooks/useDataCard";
import ROUTES from "../routes/ROUTES";
import LoginContext from "../store/loginContext";
import { Bounce, Flip, toast } from "react-toastify";
import normalizeCards from "./Favorite/normalizeFav";
const HomePage = () => {
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();
  const CardFav = useDataCard();
  const login = useContext(LoginContext);
  const [count] = useState(12);
  const navigate = useNavigate();
  let { dataFromServer, setDataFromServer, setCardsCopy } =
    useContext(filterContext);
  const handleDeleteCard = (id) => {
    const fetchInfo = async () => {
      try {
        await axios.delete("/cards/" + id).then(({ data }) => {
          setDataFromServer((cCardsFromServer) => {
            return cCardsFromServer.filter((card) => card._id !== id);
          });
        });
        toast.success('🧹 Card has been deleted', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      } catch (error) {
        if (!login) navigate(ROUTES.LOGIN);
      }
      toast.warn("You are not allowed to delete", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    };
    fetchInfo();
  };
  const handleEditCard = (id) => {
    handleEditClick(id);
  };
  const handleFavCard = async (id) => {
    handleFavClick(id);
  };
  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await axios.get("/cards").then(({ data }) => {
          setDataFromServer(normalizeCards(data));
          setCardsCopy(normalizeCards(data));
        });
      } catch (err) {
        return <Typography>Error, Something went wrong i guess</Typography>;
      }
    };

    fetchInfo();
  }, [setDataFromServer, setCardsCopy]);

  if (!dataFromServer || !dataFromServer.length) {
  }
  return (
    <Grid container spacing={2} mt={2}>
      <Fragment>
        <PageHeader />
      </Fragment>
      <Link to={ROUTES.CREATECARD}>
        <Grid>
        </Grid>
      </Link>

      {CardFav.slice(0, count).map((card, index) => (
        <Grid item lg={4} md={6} xs={12} key={"carsCard" + index}>
          <CardComponent
            id={card._id}
            title={card.title}
            subtitle={card.subtitle}
            img={card.image.url}
            phone={card.phone}
            address={card.address}
            cardNumber={card.bizNumber}
            onDelete={handleDeleteCard}
            Info={handleInfoClick}
            onEdit={handleEditCard}
            onFav={handleFavCard}
            onLike={card.liked}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;