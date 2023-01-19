import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

import React from "react";
import { SpotifyLoginButton } from "./SpotifyLoginButton";
import spotifyApi from "spotify-web-api-node";

type HeaderProps = {
  loggedIn: boolean;
  loggedinUser?: string;
  onStartOver: () => void;
  onLogout: () => void;
  spotify?: spotifyApi;
};
export const Header = ({
  loggedIn,
  loggedinUser,
  onStartOver,
  onLogout,
  spotify,
}: HeaderProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BPM-er
          </Typography>
          <Button
            sx={{ mx: 2 }}
            color="secondary"
            variant="contained"
            onClick={onStartOver}
          >
            Start Over
          </Button>
          <SpotifyLoginButton
            sx={{
              fontSize: {
                xs: "0.65rem",
                sm: "0.8rem",
              },
            }}
            spotify={spotify}
            onLogout={onLogout}
            variant="outlined"
            color="inherit"
            loggedIn={loggedIn}
            user={loggedinUser}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
