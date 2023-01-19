import type { NextApiRequest, NextApiResponse } from "next";
import spotifyApi from "spotify-web-api-node";

const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];
const redirectUri = process.env.HOST || "",
  clientId = process.env.SPOTIFY_CLIENT_ID || "",
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";

type Data = {
  redirectUrl: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authorizeURL = new spotifyApi({
    redirectUri: `${redirectUri}/callback`,
    clientId,
    clientSecret,
  }).createAuthorizeURL(scopes, "state");

  res.status(200).json({ redirectUrl: authorizeURL });
}
