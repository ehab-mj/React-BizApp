import { Box, Avatar, Typography, Grid, Button, Slide } from "@mui/material";
import TextInputComponent from "../Component/TextInputComponent";
import axios from "axios";
import { toServer } from "../services/normalizeToServer";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { Flip, toast } from "react-toastify";
import useInputs from "../hooks/useInputs";
import ROUTES from "../routes/ROUTES";
const EditCardPage = () => {
  const {
    id,
    handleInputsChange,
    handleInputsBlur,
    inputsValue,
    setInputsValue,
    errors,
    navigate,
    keysArray,
    isRequired,
  } = useInputs();
  const handleReset = () => {
    setInputsValue((cInputsValue) => {
      const clear = Object.keys(cInputsValue)
        .reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});
      return clear;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`cards/${id}`, toServer(inputsValue));
      toast.success(
        "Card Edited Successed!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        }
      );
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      toast.error("You have to change the card infromation!", {
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

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: 8,
      }}
    >
      <Avatar sx={{
        m: 1,
        bgcolor: "#1AA5B0"
      }}>
        <EditNoteRoundedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Edit the card
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 3
        }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              autoFocus={keyName === "title"}
              required={isRequired(keyName)}
            />
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={8} xs>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                mb: 2
              }}
              type="submit"
              fullWidth
              disabled={Boolean(Object.keys(errors).length > 0)}
            >
              Done
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              color="secondary"
              style={{ background: "#1AA5B0" }}
              sx={{
                mb: 2,
                mt: 2,
                width: "100%",
                ml: "0%",
              }}

              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default EditCardPage;
