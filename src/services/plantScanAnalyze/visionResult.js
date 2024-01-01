import * as FileSystem from "expo-file-system";

const VisionResult = async (imageUri) => {
  console.log("analyzing image", imageUri);
  try {
    if (!imageUri) {
      alert("Please select an image first.");
      return null;
    }

    // Replace 'YOUR_GOOGLE_CLOUD_VISION_API_KEY' with your actual API key
    const apiKey = "AIzaSyBb2Ub_oC54Uqy5PoXw-5eq98a1yapG8cA";
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    // Read the image file from local URI and convert it to base64
    const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const requestData = {
      requests: [
        {
          image: {
            content: base64ImageData,
          },
          features: [{ type: "WEB_DETECTION", maxResults: 5 }],
          imageContext: {
            languageHints: ["en"],
          },
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();
    const result =
      responseData.responses[0].webDetection.webEntities[0].description;
    console.log("result", result);

    if (response.ok) {
      console.log("result Returned", result);
      return result;
    } else {
      console.error("Error analyzing image:", responseData.error.message);
      return null;
    }
  } catch (error) {
    console.error("Error analyzing image:", error);
    return null;
  }
};

export default VisionResult;
