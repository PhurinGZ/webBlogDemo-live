// EditProfile.jsx
import { useState, useEffect } from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { updateProfile } from "../actions/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const EditProfile = ({ initialName, initialAvatarUrl, onClose }) => {
  const classes = useStyles();
  const [name, setName] = useState(initialName || "");
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || "");
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("avatarUrl", avatarUrl);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      await dispatch(updateProfile(formData));
      onClose();
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    setName(initialName || "");
    setAvatarUrl(initialAvatarUrl || "");
  }, [initialName, initialAvatarUrl]);

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography
        variant="h5"
        align="center"
        className={classes.title}
        gutterBottom
      >
        Edit Profile
      </Typography>
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={classes.input}
      />
      <input
        type="file"
        accept="image/*"
        id="avatarInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="avatarInput">
        <Button
          component="span"
          variant="outlined"
          color="primary"
          fullWidth
          className={classes.button}
        >
          Choose Avatar
        </Button>
      </label>
      <Box>
        <Button
          onClick={handleUpdateProfile}
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
        >
          Save Changes
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          className={classes.button}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default EditProfile;
