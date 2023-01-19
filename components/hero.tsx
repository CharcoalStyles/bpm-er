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
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
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
