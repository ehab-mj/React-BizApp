import { Typography, Grid, Container, Box } from "@mui/material";
import PropTypes from "prop-types";
import "../header/ui/CssHeader/Background.css"
import "../header/ui/CssHeader/Text.css"
import "../header/ui/CssHeader/SearchBox.css"
const PageHeader = () => {
  return (
    <Container>
      <Grid container spacing={2} mt={2} xs={12}>
        <Grid xs={12} md={12} width={"100vw"}
          sx={{
            fontSize: "2.5rem",
            width: "40vw"
          }}>
          <Typography fontSize="3rem" fontFamily="'Righteous', sans-serif"
          >
            Ehab React Project
          </Typography>
        </Grid>

        <Grid xs={12} md={12} width={"100vw"}>
          <Typography fontSize="2rem" fontFamily="'Righteous', sans-serif"
            sx={{
              fontSize: "1.6rem",
              color: "#1AA5B0",
            }}
          >
            Cards Page
          </Typography>
        </Grid>
        <Box className="Container" square raised >
          <img className="image" src="./assets/imgs/Bg.png"
          />
        </Box>
      </Grid>
    </Container >
  );
};
PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  paragraph: PropTypes.string,
};

export default PageHeader;
