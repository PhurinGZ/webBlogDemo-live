import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../App";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [file, setFile] = useState(null); // Use null to represent no file

  const user = useContext(userContext);

  const handleInputChange = (e, setStateFunction) => {
    setStateFunction(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addEmoji = (emoji) => () => setDesc(`${description}${emoji}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("email", user.email);
    formData.append("name", user.name);
    if (file) {
      formData.append("file", file);
    }

    axios
      .post("http://localhost:5000/create", formData)
      .then((res) => {
        if (res.data) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Grid container justifyContent="center" mt={5}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Create a New Post
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Post Title"
                  variant="outlined"
                  margin="normal"
                  value={title}
                  onChange={(e) => handleInputChange(e, setTitle)}
                />
                <Textarea
                  placeholder="Post Description"
                  value={description}
                  onChange={(event) => setDesc(event.target.value)}
                  multiline
                  minRows={10}
                  maxRows={10}
                  startDecorator={
                    <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                      <IconButton
                        variant="outlined"
                        color="neutral"
                        onClick={addEmoji("👍")}
                      >
                        👍
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        color="neutral"
                        onClick={addEmoji("🏖")}
                      >
                        🏖
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        color="neutral"
                        onClick={addEmoji("😍")}
                      >
                        😍
                      </IconButton>
                    </Box>
                  }
                  endDecorator={
                    <Typography variant="body-xs" sx={{ ml: "auto" }}>
                      {description.length} character(s)
                    </Typography>
                  }
                  sx={{ minWidth: 300 }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="postImage"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="postImage">
                  <Button variant="outlined" component="span">
                    Upload an Image
                  </Button>
                </label>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreatePost;
