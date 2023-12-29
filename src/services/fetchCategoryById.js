const fetchCategoryById = async (id, category) => {
  try {
    const response = await fetch(
      `https://trefle.io/api/v1/${category}/${id}?token=6-zgTrpjdpJK-7MqVo_iXczQRpdIq_hmEIDfdhTUxlg`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const json = await response.json();
    const newData = json.data;

    // Assuming textResult is a state variable
    return newData;

    // Log the current state of textResult
    // console.log(textResult);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export default fetchCategoryById;
