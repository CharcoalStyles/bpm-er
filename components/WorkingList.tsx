import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import SpotifyApi from "spotify-web-api-node";

type PlaylistsProps = {
  spotifyApi: SpotifyApi;
  initalSongList: Array<SpotifyApi.TrackObjectFull>;
  onGenerate: (songList: Array<AugmentedSong>) => void;
};

export type AugmentedSong = SpotifyApi.TrackObjectFull & {
  audioFeatures: SpotifyApi.AudioFeaturesObject;
};

export const WorkingList = ({
  spotifyApi,
  initalSongList,
  onGenerate,
}: PlaylistsProps) => {
  const [loading, setLoading] = useState(true);
  const [songList, setSongList] = useState<Array<AugmentedSong>>([]);

  useEffect(() => {
    if (initalSongList?.length > 0) {
      spotifyApi
        .getAudioFeaturesForTracks(initalSongList.map((song) => song.id))
        .then(({ body: { audio_features } }) => {
          setSongList(
            initalSongList.map((song, i) => ({
              ...song,
              audioFeatures: audio_features[i],
            }))
          );
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [initalSongList]);

  return (
    <Box sx={{ py: 4 }}>
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <Typography>
            {loading && "Loading..."}
            {!loading &&
              "Please select up to 5 songs to seed your new playlist"}
          </Typography>
        </Grid>

        <Grid item xs={4} alignContent="baseline">
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={loading || songList.length > 5}
            onClick={() => {
              onGenerate(songList);
              setLoading(true);
            }}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
      <List>
        {songList.map((song) => (
          <ListItem
            alignItems="flex-start"
            key={song.id}
            secondaryAction={
              <IconButton
                disabled={loading}
                edge="end"
                aria-label="delete"
                onClick={() => {
                  setSongList(songList.filter((s) => s.id !== song.id));
                }}
              >
                <Delete color="error" />
              </IconButton>
            }
          >
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
