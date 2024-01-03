import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchCategoryById from "./fetchCategoryById";

// Function to get a random plant index
const getRandomPlantIndex = () => Math.floor(Math.random() * 400000) + 1;

// Function to get a random valid plant index with image_url
const getRandomValidIndex = async () => {
  let index = getRandomPlantIndex();
  let data = await fetchCategoryById(index, "plants");
  while (!data || !data.image_url || data.image_url == null) {
    index = getRandomPlantIndex();
    data = await fetchCategoryById(index, "plants");
  }
  return index;
};

// Function to get the stored plant data for the day
const getStoredPlantsData = async () => {
  const storedData = await AsyncStorage.getItem("plantsOfTheDayData");
  if (storedData) {
    const { date, plantIndexes } = JSON.parse(storedData);
    const today = new Date().toLocaleDateString();
    if (date === today && plantIndexes.length === 3) {
      const plantDataPromises = plantIndexes.map((index) =>
        fetchCategoryById(index, "plants")
      );
      return Promise.all(plantDataPromises);
    } else {
      // Clear stored data if it's from the previous day
      await AsyncStorage.removeItem("plantsOfTheDayData");
    }
  }
  return null;
};

// Function to set the stored plant data for the day
const setStoredPlantsData = async (plantIndexes) => {
  const today = new Date().toLocaleDateString();
  await AsyncStorage.setItem(
    "plantsOfTheDayData",
    JSON.stringify({ date: today, plantIndexes })
  );
};

// Function to get or generate the plant data for the day
const getPlantsDataForTheDay = async () => {
  const storedData = await getStoredPlantsData();
  if (storedData) {
    return storedData;
  }

  let plantIndexes = [];
  for (let i = 0; i < 3; i++) {
    const index = await getRandomValidIndex();
    plantIndexes.push(index);
  }

  await setStoredPlantsData(plantIndexes);
  const plantDataPromises = plantIndexes.map((index) =>
    fetchCategoryById(index, "plants")
  );
  return Promise.all(plantDataPromises);
};

// Display the plant details
const plantsOfTheDayData = getPlantsDataForTheDay();

export default plantsOfTheDayData;
