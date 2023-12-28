const fetchPlants = async () => {
  try {
    const response = await fetch(
      `https://trefle.io/api/v1/plants?token=6-zgTrpjdpJK-7MqVo_iXczQRpdIq_hmEIDfdhTUxlg`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch plants");
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching plants:", error.message);
    return [];
  }
};

const getUniqueFamilyCommonNames = async () => {
  try {
    const plants = await fetchPlants();
    const uniqueFamilyCommonNames = [
      ...new Set(plants.map((plant) => plant.genus)),
    ];
    return uniqueFamilyCommonNames;
  } catch (error) {
    console.error("Error getting unique family common names:", error.message);
    return [];
  }
};

export default getUniqueFamilyCommonNames;
