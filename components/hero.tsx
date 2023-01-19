import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { SpotifyLoginButton } from "./SpotifyLoginButton";

export const Hero = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        mt: 8,
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          have a playlist of songs to run to and I noticed that some are much
          better than others; I kind of get into the groove with the beat. So, I
          made a thing to take some songs that work with their BPM and ask
          Spotify to make a new play list.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <SpotifyLoginButton
            variant="contained"
            loggedIn={false}
            spotify={undefined}
            onLogout={() => {}}
          />
        </Stack>
      </Container>
    </Box>
  );
};
