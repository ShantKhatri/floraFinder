import { differenceInDays, parseISO } from "date-fns";
import fetchCategoryById from "./fetchCategoryById";

const referenceDate = parseISO("2024-01-01");

const referenceIndex2 = 100000;
const referenceIndex3 = 200000;

const currentDate = new Date();

const daysDifference = differenceInDays(currentDate, referenceDate);

const plantIndex = [
  //   daysDifference,
  1,
  referenceIndex2 + daysDifference,
  referenceIndex3 + daysDifference,
];

const plantsData = async () => {
  let allData = [];
  for (let i = 0; i < plantIndex.length; i++) {
    allData.push(await fetchCategoryById(plantIndex[i], "plants"));
  }
  return allData;
};

// Display the plant details
const plantsOfTheDayData = plantsData();

export default plantsOfTheDayData;
