// UserProfile.jsx
import React, { useState, useEffect, useContext } from "react";
import { Avatar, Typography, Paper, Button, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { profile } from "../actions/user";
import { userContext } from "../App";
import EditProfile from "./editProfile";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const user = useContext(userContext);
  const dispatch = useDispatch();

  const handleEditSuccess = () => {
    setSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user) {
          console.error("User context not available");
          setLoading(false);
          return;
        }

        if (!user.email) {
          console.error("User email is undefined");
          setLoading(false);
          return;
        }

        const profileResult = await dispatch(profile(user.email));

        if (!profileResult) {
          console.warn("No profile data found");
          setLoading(false);
          return;
        }

        setUserProfile(profileResult);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, dispatch]);

  const handleEditProfileClick = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Paper
        elevation={3}
        style={{ padding: 20, maxWidth: 400, margin: "auto", marginTop: 50 }}
      >
        <Avatar
          alt={userProfile.name}
          src={userProfile.avatarUrl}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h5" align="center" gutterBottom>
          {userProfile.name}
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          {userProfile.email}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleEditProfileClick}
        >
          Edit Profile
        </Button>
      </Paper>

      <Modal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-profile-modal"
        aria-describedby="edit-profile-modal-description"
      >
        <EditProfile
          initialName={userProfile.name}
          initialAvatarUrl={userProfile.avatarUrl}
          id={userProfile._id}
          onClose={() => setEditModalOpen(false)}
          onSuccess={handleEditSuccess}
        />
      </Modal>
      <Modal
        open={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        aria-labelledby="success-modal"
        aria-describedby="success-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            Profile Updated Successfully!
          </Typography>
          <Button
            onClick={handleSuccessModalClose}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;
