import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SpotifyApi from "spotify-web-api-node";
import { AugmentedSong } from "./WorkingList";

type ResultProps = {
  spotifyApi: SpotifyApi;
  songList: Array<SpotifyApi.TrackObjectFull>;
  onExit: () => void;
};

type SavingState = "idle" | "saving" | "saved";

export const Result = ({ spotifyApi, songList, onExit }: ResultProps) => {
  const [augmentedSongList, setAugmentedSongList] = useState<
    Array<AugmentedSong>
  >([]);
  const [state, setState] = useState<SavingState>("idle");

  const [playlistName, setPlaylistName] = useState<string>("");
  const [privatePlaylist, setPrivatePlaylist] = useState<boolean>(false);

  useEffect(() => {
    if (songList.length > 0) {
      spotifyApi
        .getAudioFeaturesForTracks(songList.map((song) => song.id))
        .then(({ body: { audio_features } }) => {
          setAugmentedSongList(
            songList.map((song, i) => ({
              ...song,
              audioFeatures: audio_features[i],
            }))
          );
        });
    }
  }, [songList]);

  return (
    <Box sx={{ py: 4 }}>
      <Grid container alignItems="center">
        {state === "idle" && (
          <>
            <Grid item xs={4}>
              <Input
                fullWidth
                color="primary"
                placeholder="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={privatePlaylist}
                    onChange={(e) => setPrivatePlaylist(e.target.checked)}
                  />
                }
                label="Private"
              />
            </Grid>

            <Grid item xs={4} alignContent="baseline">
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                  setState("saving");
                  spotifyApi
                    .createPlaylist(playlistName, {
                      public: privatePlaylist,
                    })
                    .then(({ body }) => {
                      spotifyApi
                        .addTracksToPlaylist(
                          body.id,
                          songList.map((song) => song.uri)
                        )
                        .then(() => {
                          setState("saved");
                        });
                    });
                }}
              >
                Save Playlist
              </Button>
            </Grid>
          </>
        )}
        {state === "saving" && (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Saving...
            </Typography>
          </Grid>
        )}
        {state === "saved" && (
          <>
            <Grid item xs={8}>
              <Typography variant="h6" align="center">
                Saved!
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={onExit}
              >
                Create Another?
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <List>
        {augmentedSongList.map((song) => (
          <ListItem alignItems="flex-start" key={song.id}>
            <Grid container>
              <Grid item xs={8}>
                <ListItemText
                  primary={song.name}
                  secondary={song.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemText
                  primary={`BPM: ${Math.floor(song.audioFeatures.tempo)}`}
                />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
