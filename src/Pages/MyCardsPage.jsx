import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDataCard from "../hooks/useDataCard";
import { Grid, Button, Tooltip } from "@mui/material";
import filterContext from "../store/filterContext";
import ROUTES from "../routes/ROUTES";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useHandleFavClick from "../hooks/useHandleFav";
import { Bounce, Flip, toast } from "react-toastify";
import CardComponent from "../Component/CardComponent";
import axios from "axios";
import LoginContext from "../store/loginContext";
import normalizeFav from "../services/normalizeLike";
import normalizeCards from "./Favorite/normalizeFav";

const MyCardsPage = () => {
  let { dataFromServer, setDataFromServer, setCardsCopy } =
    useContext(filterContext);
  const [count] = useState(12);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const { handleFavClick } = useHandleFavClick();
  const CardFav = useDataCard();
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await axios.get("/cards/my-cards").then(({ data }) => {
          setDataFromServer(normalizeCards(data));
          setCardsCopy(normalizeCards(data));
        });
      } catch (err) {
        toast.error("Try Again!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    };

    fetchInfo();
  }, [setDataFromServer, setCardsCopy]);

  if (!dataFromServer || !dataFromServer.length) {
    return (
      <Fragment>
        <Link to={ROUTES.CREATECARD}>
          <Grid mt={3}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Tooltip title="Create a Card">
              <Button sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
                style={{
                  backgroundColor: "#1AA5B0",
                  width: "100%",
                  display: "flex",
                  flexDirection: "coulmn",
                  position: "relative",
                  alignItems: "center",
                }}>
                <AddCircleIcon
                  style={{ fontSize: "2rem", color: "white" }} />
              </Button>
            </Tooltip>
          </Grid>
        </Link>
      </Fragment>
    );
  }

  const handleFavCard = async (id) => {
    handleFavClick(id);
  };
  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };
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
    };
    fetchInfo();
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  return (
    <Fragment>
      <Tooltip title="Create a Card">
        <Link to={ROUTES.CREATECARD}>
          <Grid mt={3}
            justifyContent="center"
            container
            alignItems="center"
            direction="column"
          >
          </Grid>
        </Link>
      </Tooltip>

      <Grid container spacing={2} mt={7}>
        {CardFav.slice(0, count).map((card, index) => (
          <Grid item lg={4} md={6} xs={12} key={"carsCard" + index}>
            <CardComponent
              id={card._id}
              title={card.title}
              subtitle={card.subtitle}
              img={card.image.url}
              phone={card.phone}
              address={card.address}
              Info={handleInfoClick}
              cardNumber={card.bizNumber}
              onEdit={handleEditCard}
              onFav={handleFavCard}
              onLike={card.liked}
              onDelete={handleDeleteCard}
            />
          </Grid>
        ))}

        <Link to={ROUTES.CREATECARD}>
          <Tooltip title="Create a Card">
            <Button sx={{ display: "flex", justifyContent: "center", padding: "1rem", marginLeft: "1.69rem", marginRight: "0" }}
              style={{
                backgroundColor: "#1AA5B0",
                width: "50%",
                marginTop: "1rem",
                display: "flex",
                flexDirection: "coulmn",
                justifyContent: "center",
                position: "relative",
                alignItems: "center",
                borderRadius: "50%",
              }}>
              <AddCircleIcon
                style={{ fontSize: "2rem", color: "white" }} />
            </Button>
          </Tooltip>
        </Link>

      </Grid>
    </Fragment>
  );
};

export default MyCardsPage;
