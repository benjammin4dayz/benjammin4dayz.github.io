fetch('https://api.thecatapi.com/v1/images/search')
  .then((response) => response.json())
  .then((data) => {
    const imageUrl = data[0].url;
    setCatImage(imageUrl);
  })
  .catch((error) => {
    console.error('Error:', error);
    const imageUrl = 'https://cdn2.thecatapi.com/images/c2a.jpg';
    setCatImage(imageUrl);
  });

function setCatImage(imageUrl) {
  const imageElement = document.getElementById('catImage');
  imageElement.src = imageUrl;
}
