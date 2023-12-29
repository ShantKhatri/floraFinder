const fetchPlant = async (textSearch) => {
  const response = await fetch(
    `https://trefle.io/api/v1/plants/search?token=6-zgTrpjdpJK-7MqVo_iXczQRpdIq_hmEIDfdhTUxlg&q=${textSearch}`
  );
  const json = await response.json();
  // const data = json.data.filter(
  //   (item) =>
  //     (item.common_name &&
  //       item.common_name.toLowerCase().includes(textSearch)) ||
  //     (item.scientific_name &&
  //       item.scientific_name.toLowerCase().includes(textSearch)) ||
  //     (item.slug && item.slug.toLowerCase().includes(textSearch)) ||
  //     (item.family_common_name &&
  //       item.family_common_name.toLowerCase().includes(textSearch)) ||
  //     (item.family && item.family.toLowerCase().includes(textSearch)) ||
  //     (item.genus && item.genus.toLowerCase().includes(textSearch)) ||
  //     (item.year && item.year === textSearch) ||
  //     (item.bibliography &&
  //       item.bibliography.toLowerCase().includes(textSearch)) ||
  //     (item.author && item.author.toLowerCase().includes(textSearch)) ||
  //     (item.rank && item.rank.toLowerCase().includes(textSearch))
  // );
  const data = json.data;
  return data;
};

export default fetchPlant;
