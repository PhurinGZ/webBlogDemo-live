// EditPost.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditPostCard from "../components/EditPostCard";
import EditPostForm from "../components/EditPostForm";

function EditPost() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/editpost/${id}`, { title, description })
      .then((res) => {
        if (res.data) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getPostByid/${id}`)
      .then((result) => {
        setTitle(result.data.title);
        setDesc(result.data.description);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <EditPostCard>
      <EditPostForm
        onSubmit={handleSubmit}
        title={title}
        onTitleChange={setTitle}
        description={description}
        onDescriptionChange={setDesc}
      />
    </EditPostCard>
  );
}

export default EditPost;
