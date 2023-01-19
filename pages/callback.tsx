import { useEffect } from "react";
import axios from "axios";

export default function Callback() {
  //store the query params in local storage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      axios
        .get(`/api/spotify/getRefreshToken?code=${code}`)
        .then(({ data }) => {
          const { access_token, refresh_token } = data;
          
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          window.location.replace("/");
        });
    }
  }, []);
  return null;
}
