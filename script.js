"use strict";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
// Function to render country details
const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" alt="${data.name.common} flag" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">Region: ${data.region}</h4>
        <p class="country__row"><span>👨‍👨‍👧‍👧</span>Population: ${data.population}</p>
        <p class="country__row"><span>📌</span><a href="${data.maps.googleMaps}" target="_blank">View on Maps</a></p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
// Function to fetch country data and render it
const getCountryData = function (country) {
  // Fetch country 1 data
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;
      // 2 neighbour country data
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response) return;
      if (!response.ok);
      return response.json();
    })
    .then((data) => renderCountry(data[0], "neighbour"));
};

getCountryData("uae");
