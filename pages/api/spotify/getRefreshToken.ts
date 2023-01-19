import { Console } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import spotifyApi from "spotify-web-api-node";

const redirectUri = process.env.HOST || "",
  clientId = process.env.SPOTIFY_CLIENT_ID || "",
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";

type Data =
  | {
      access_token: string;
      refresh_token: string;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //get code from query
  const code = req.query.code;

  if (!code || Array.isArray(code)) {
    res.status(400).json({ error: "No code provided" });
    return;
  }
  const sApi = new spotifyApi({
    redirectUri: `${redirectUri}/callback`,
    clientId,
    clientSecret,
  });
  const { body } = await sApi.authorizationCodeGrant(code);

  const { access_token, refresh_token } = body;

  res.status(200).json({ access_token, refresh_token });
}
