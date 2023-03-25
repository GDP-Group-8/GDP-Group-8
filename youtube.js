import axios from "axios";
// Replace with your API key and client ID
const API_KEY = "YOUR_API_KEY";
const CLIENT_ID =
  "114397723313-b2b9mn4401nt72anlmk9fqosbu0jlc3b.apps.googleusercontent.com";
//client secret= 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
const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: API_KEY,
  },
});

export const getAccessToken = async (authCode) => {
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          code: authCode,
          client_id: CLIENT_ID,
          redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
          grant_type: "authorization_code",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.log("Error getting access token:", error);
    throw error;
  }
};

export const uploadVideo = async (
  accessToken,
  videoUri,
  title,
  description
) => {
  try {
    const videoData = new FormData();
    videoData.append("video", {
      uri: videoUri,
      name: "video.mp4",
      type: "video/mp4",
    });

    const response = await youtubeApi.post("/videos", videoData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        uploadType: "multipart",
        part: "snippet,status",
        onBehalfOfContentOwner: "",
        onBehalfOfContentOwnerChannel: "",
      },
    });

    return response.data.id;
  } catch (error) {
    console.log("Error uploading video:", error);
    throw error;
  }
};

export default youtubeApi;
