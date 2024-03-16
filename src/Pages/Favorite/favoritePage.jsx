import { Grid, Slide } from "@mui/material";
import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, Flip, toast } from "react-toastify";
import filterContext from "../../store/filterContext";
import LoginContext from "../../store/loginContext";
import useHandleFavClick from "../../hooks/useHandleFav";
import useDataCard from "../../hooks/useDataCard";
import ROUTES from "../../routes/ROUTES";
import CardComponent from "../../Component/CardComponent";
import useHandleEditCard from "../../hooks/useHandleEdit";
import normalizeCards from "./normalizeFav";
const FavPage = () => {
    const { handleFavClick } = useHandleFavClick();
    const { handleEditClick } = useHandleEditCard();
    const navigate = useNavigate();
    const { login } = useContext(LoginContext);
    const CardFav = useDataCard();
    let { setCardsCopy, setDataFromServer } = useContext(filterContext);
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                await axios.get("/cards")
                    .then(({ data }) => {
                        setDataFromServer(normalizeCards(data));
                        setCardsCopy(normalizeCards(data));
                        toast.success("Check you favourites here!", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Slide,
                        });
                    });
            } catch (err) {
                toast.error("There was an error!", {
                    position: "top-center",
                    autoClose: 3000,
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

        fetchLikes();
    }, [setCardsCopy, setDataFromServer]);

    if (!CardFav || !CardFav.length) {
    }

    const handleEditCard = (id) => {
        handleEditClick(id);
    };

    const handleFavCard = async (id) => {
        handleFavClick(id);
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

    const handleInfoClick = (id) => {
        navigate(`${ROUTES.DETAILS}/${id}`);
    };
    return (
        <Fragment>
            <Grid container spacing={2} mt={5}>
                {CardFav.map(
                    (card, index) =>
                        CardFav[index].likes.some((id) => id === login._id) && (
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
                        )
                )}
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    m={3}
                >
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default FavPage;
