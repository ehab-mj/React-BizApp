import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Paper, Card, CardActionArea, CardMedia, Box } from "@mui/material";
import CardComponent from "../../Component/CardComponent";
import useDataCard from "../../hooks/useDataCard";
import useHandleFavClick from "../../hooks/useHandleFav";
import useHandleEditCard from "../../hooks/useHandleEdit";
import normalizeFav from "../../services/normalizeLike";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import filterContext from "../../store/filterContext";
import "./Details.css"
import { Flip, toast } from "react-toastify";
import LoginContext from "../../store/loginContext";
const DetailsPage = ({ city, street, houseNumber }) => {
  const { setDataFromServer } = useContext(filterContext);
  const { id: _id } = useParams();
  const CardFav = useDataCard();
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const location = {
    lat: 32.13147290769876,
    lng: 34.96580113830216,
  };

  const containerStyle = {
    width: '100%',
    height: '52vh',
    marginTop: '2rem'
  };
  useEffect(() => {
    const fetchInfo = async () => {
      if (!_id) return;

      try {
        const { data } = await axios.get(`cards/${_id}`);
        setDataFromServer([normalizeFav(data)]);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchInfo();
  }, [_id, setDataFromServer]);


  const handleEditCard = (id) => {
    handleEditClick(id);
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
  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };
  const handleFavCard = async (id) => {
    handleFavClick(id);
  };
  return (
    <Container>
      <Grid container spacing={2} mt={2} xs={12}>
        {CardFav.map((card, index) => (
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            key={"carsCard" + index}
            justifyContent="center"
            alignItems="center"
            m={2}
          >
            <Card className="cardsBody" square raised >
              <CardActionArea>
                <Grid
                >
                  <div className="Body">
                    <CardMedia className="cardsBody">
                      <CardComponent
                        id={card._id}
                        title={card.title}
                        subtitle={card.subtitle}
                        img={card.image.url}
                        phone={card.phone}
                        address={card.address}
                        cardNumber={card.bizNumber}
                        Info={handleInfoClick}
                        onEdit={handleEditCard}
                        onFav={handleFavCard}
                        onLike={card.liked}
                        onDelete={handleDeleteCard}
                      />

                    </CardMedia>
                  </div>
                </Grid>
              </CardActionArea>
            </Card>
            <Grid item xs={12} md={12}>
              <Box
                elevation={3}
                sx={{
                  padding: 2,
                  height: "16.8vh",
                  borderRadius: "0",
                  background: "#1AA5B0",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {`${CardFav[0]?.title}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Address:</strong>{" "}
                  {`${CardFav[0].address.street}, ${CardFav[0].address.city
                    }, ${CardFav[0].address.country}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Phone:</strong> {`${CardFav[0].phone}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Email:</strong> {`${CardFav[0].email}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>description:</strong> {`${CardFav[0].description}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Card Number:</strong> {`${CardFav[0].bizNumber}`}
                </Typography>
              </Box>
              <Grid item xs={12} md={12}>
                <Box elevation={3}
                  sx={{
                    padding: 1,
                    height: "66.8vh",
                    borderRadius: "0",
                    fontSize: "1rem",
                    background: "#1AA5B0",
                  }}>
                  {/* sometimes the Google map api not working shows errors on screen i think my pc cant run the api  */}
                  <div style={{ height: '100vh', width: '100%' }}>
                    <LoadScript googleMapsApiKey={"AIzaSyCKxCRfh3SS1NNLIh91nbMVASCf6gB6ptY"}>
                      <GoogleMap
                        id="example-map"
                        mapContainerStyle={containerStyle}
                        zoom={10}
                        center={location}
                      >
                      </GoogleMap>
                    </LoadScript>
                  </div>
                  {/* <div style={{ height: '100vh', width: '100%' }}>
                    <iframe
                      mapContainerStyle={containerStyle}
                      zoom={10}
                      center={location}
                      src={`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20${street},%20${city},%20${houseNumber}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}>
                      <a href="https://www.gps.ie/">gps systems</a>
                    </iframe>
                  </div> */}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container >
  );
};

export default DetailsPage;
