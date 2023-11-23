// UserProfile.jsx
import { useState, useEffect, useContext } from 'react';
import { Avatar, Typography, Paper, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { profile } from '../actions/user';
import { userContext } from '../App';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({});

  const user = useContext(userContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user) {
          console.error("User context not available");
          return;
        }

        console.log("Sending email:", user.email);

        const profileResult = await dispatch(profile(user.email));

        if (!profileResult) {
          console.error("Invalid profile result:", profileResult);
          setError("Invalid profile result");
          setLoading(false);
          return;
        }

        setUserProfile(profileResult);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("User not found");
        } else {
          console.error("Error fetching user profile:", error);
          setError("Error fetching user profile");
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <Avatar
        alt={userProfile.name}
        src={userProfile.avatarUrl}
        sx={{ width: 100, height: 100, margin: 'auto' }}
      />
      <Typography variant="h5" align="center" gutterBottom>
        {userProfile.name}
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        {userProfile.email}
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        Edit Profile
      </Button>
    </Paper>
  );
};

export default UserProfile;
