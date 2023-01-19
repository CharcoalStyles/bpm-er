import {
  Avatar,
  Box,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowRightOutlined, QuestionMark } from "@mui/icons-material";
import SpotifyApi from "spotify-web-api-node";

type PlaylistsProps = {
  spotifyApi: SpotifyApi;
  onSelectPlaylist: (playlistId: string) => void;
};
const pageSize = 30;

export const Playlists = ({ spotifyApi, onSelectPlaylist }: PlaylistsProps) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [playlists, setPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  useEffect(() => {
    spotifyApi
      .getUserPlaylists({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      })
      .then(({ body: { items, total } }) => {
        setPlaylists(items);
        setTotal(total);
      });
  }, [currentPage]);

  return (
    <Box sx={{ py: 4 }}>
      <Box justifyContent="center">
        <Pagination
          disabled={loading}
          count={Math.floor(total / pageSize)}
          page={currentPage}
          onChange={(_, page) => {
            setCurrentPage(page);
          }}
        />
      </Box>
      <List>
        {playlists?.map((playlist) => (
          <ListItemButton
            disabled={loading}
            key={playlist.id}
            onClick={() => {
              setLoading(true);
              onSelectPlaylist(playlist.id);
            }}
          >
            <ListItemAvatar>
              {playlist.images.length > 0 ? (
                <Avatar src={playlist.images[0].url} />
              ) : (
                <QuestionMark />
              )}
            </ListItemAvatar>

            <ListItemText primary={playlist.name} />
            <Icon>
              <ArrowRightOutlined />
            </Icon>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
