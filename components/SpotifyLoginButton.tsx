import { Button, ButtonProps } from "@mui/material";
import axios from "axios";
import spotifyApi from "spotify-web-api-node";

type SpotifyLoginButtonProps = ButtonProps & {
  loggedIn: boolean;
  user?: string;
  spotify?: spotifyApi;
  onLogout: () => void;
};

export const SpotifyLoginButton = ({
  loggedIn,
  user,
  spotify,
  onLogout,
  ...rest
}: SpotifyLoginButtonProps) => {
  return (
    <Button
      {...rest}
      onClick={() => {
        if (loggedIn) {
          spotify?.resetAccessToken();
          spotify?.resetRefreshToken();
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          onLogout();
          return;
        }
        //fetch the json response from the api route
        axios
          .get<{ redirectUrl: string }>("/api/spotify/login")
          .then(({ data }) => {
            //redirect to the spotify login page
            data.redirectUrl && window.location.replace(data.redirectUrl);
          });
      }}
    >
      {loggedIn ? `Logout` : "Sign in with Spotify"}
    </Button>
  );
};
