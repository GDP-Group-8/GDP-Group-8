import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeVideoLink = async (videoId) => {
  try {
    const videoLinks =
      JSON.parse(await AsyncStorage.getItem("videoLinks")) || [];
    videoLinks.push(`https://www.youtube.com/watch?v=${videoId}`);
    await AsyncStorage.setItem("videoLinks", JSON.stringify(videoLinks));
  } catch (error) {
    console.log("Error storing video link:", error);
    throw error;
  }
};
