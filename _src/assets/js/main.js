'use strict';

// Elements to work with
const searchButton = document.querySelector('.form__button');
const searchInput = document.querySelector('.form__input');
const seriesList = document.querySelector('.series');

// Variables to work with
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const favoriteSeries = [];
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';

// Functions

// function to take user input from input
const takeUserInput = () => {
  const value = {
    text: searchInput.value,
    status: true,
  };
  // check if value is empty
  if (!value.text) {
    value.status = false;
  } else {
    // SHOW MESSAGE
  }
  return value;
};

// function to check if show's image is available
const checkImage = img => {
  return img ? img.medium : defaultImage;
};

// function to add or remove show's id from array
const changeSeriesArray = id => {
  if (favoriteSeries.includes(id)) {
    favoriteSeries.splice(favoriteSeries.indexOf(id), 1);
  } else {
    favoriteSeries.push(id);
  }
  console.log('array', favoriteSeries);
};

// function for the show event listener
const showOnClick = event => {
  const { currentTarget: listItem } = event;
  listItem.classList.toggle('favorite');
  const showId = listItem.dataset.id;
  changeSeriesArray(showId);
};

// function to paint shows on the page
const showSeries = ({ show }) => {
  console.log(show);

  let { image, name, id } = show;

  // check if image exists
  image = checkImage(image);

  const showContainer = document.createElement('li');
  showContainer.classList.add('show');
  showContainer.setAttribute('data-id', id);

  const imageShow = document.createElement('div');
  const fakeImage = document.createElement('img');
  imageShow.classList.add('show__image');
  fakeImage.setAttribute('alt', name);
  fakeImage.setAttribute('src', image);
  fakeImage.classList.add('show__image-fake');
  imageShow.setAttribute('style', `background-image:url('${image}')`);

  const nameShow = document.createElement('h2');
  nameShow.classList.add('show__title');
  const showTitle = document.createTextNode(name);
  nameShow.appendChild(showTitle);

  showContainer.appendChild(nameShow);
  showContainer.appendChild(imageShow);

  showContainer.addEventListener('click', showOnClick);

  seriesList.appendChild(showContainer);
};

// function to fatch series from the api
const searchSeries = url => {
  const userValue = takeUserInput();
  // if user entered a search value search the api
  if (userValue.status) {
    fetch(`${url}${userValue.text}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        for (const show of data) {
          showSeries(show);
        }
      });
  }
};

// Event listeners
searchButton.addEventListener('click', () => {
  searchSeries(apiUrl);
});
