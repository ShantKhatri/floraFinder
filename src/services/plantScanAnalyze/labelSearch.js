import fetchPlant from "../fetchPlant";
import VisionResult from "./visionResult";
import * as FileSystem from "expo-file-system";

const LabelSearch = async (image) => {
  let query;
  console.log("LabelSearch:Image", image);

  console.log("searching for plant from labelSearch");
  try {
    console.log("searching for plant from labelSearch before VisionResult");

    query = await VisionResult(image);
    // const query = "oak";
    console.log("query", query);
    console.log("searching for plant from labelSearch after VisionResult");
    const response = query == null ? null : await fetchPlant(query);
    console.log("searching for plant from labelSearch after fetchPlant");
    // if (!response.ok) {
    //   throw new Error(`Error fetching data: ${response.statusText}`);
    // }
    return response;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default LabelSearch;
