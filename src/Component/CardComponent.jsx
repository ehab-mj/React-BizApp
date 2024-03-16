import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ROUTES from "../routes/ROUTES";
import { useLocation, useNavigate } from "react-router-dom";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PropTypes from "prop-types";
import "./ui/Card.css";
import { useContext } from "react";
import LoginContext from "../store/loginContext";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { Bounce, toast } from "react-toastify";
const CardComponent = ({
  title,
  subtitle,
  img,
  phone,
  address,
  cardNumber,
  id,
  onDelete,
  userId,
  onEdit,
  onFav,
  onLike,
}) => {
  const login = useContext(LoginContext);
  const to = useLocation();
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  }
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleFavClick = () => {
    onFav(id);
  };
  const handlePhone = () => {
    toast.success('📞 Ringing...', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  let AdminType = false;
  if (login) {
    if (login._id === userId || login.isAdmin) {
      AdminType = true;
    }
  }
  const handleEditClick = () => {
    onEdit(id);
  };
  return (
    <Card square raised className="cardsbody"
      style={{
        transition: 'transform 0.5s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          onClick={handleDetails}
          component="img"
          image={img}
          alt="image"
          height={200}
        />
      </CardActionArea>
      <CardHeader title={title} subheader={subtitle}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1AA5B0",
          width: "100%",
        }}>
      </CardHeader>
      <Divider></Divider>
      <CardContent>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Phone:
          </Typography>
          {""} {phone}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Address:
          </Typography>
          {""} {address.city}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {""} {cardNumber}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>

          <Box>
            {((AdminType) ||
              to.pathname === ROUTES.MYCARDS) && (
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              )}
            {((login.isBusiness && AdminType) ||
              to.pathname === ROUTES.MYCARDS) && (
                <IconButton onClick={handleEditClick}>
                  <ModeIcon />
                </IconButton>
              )}
          </Box>

          <Box>
            <IconButton onClick={handlePhone}>
              <LocalPhoneIcon />
            </IconButton>

            {login && (
              <IconButton onClick={handleFavClick}>
                <BookmarkRoundedIcon color={onLike ? "error" : "inherit"} />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    state: PropTypes.string,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.number.isRequired,
    zip: PropTypes.number.isRequired,
  }).isRequired,
  cardNumber: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  Info: PropTypes.func,
  onEdit: PropTypes.func,
  onFav: PropTypes.func,
  onLike: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "https://img.redro.pl/plakaty/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-216668545.jpg",
  subtitle: "subtitle default",
  phone: " 050-000-00-00",
  address: {
    city: " City",
    street: "Street",
    houseNumber: 911
  },
  cardNumber: "0000.0000.0000.0000",
};
export default CardComponent;
