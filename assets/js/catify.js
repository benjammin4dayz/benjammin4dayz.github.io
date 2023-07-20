fetch('https://api.thecatapi.com/v1/images/search')
  .then((response) => response.json())
  .then((data) => setCatImage(data[0].url))
  .catch((err) => {
    console.error(`Catify Error: ${err}`);
    setCatImage(true);
  });
const setCatImage = (imageUrl) => {
  if (imageUrl === true) imageUrl = 'https://cdn2.thecatapi.com/images/c2a.jpg';
  document.getElementById('catImage').src = imageUrl;
};
