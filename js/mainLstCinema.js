import { GetCinemaDistance } from "./mainGeolocalisation.js";
import { userPos } from "./mainGeolocalisation.js";
const cinemaLst = document.getElementById("cinemaLst");

// Fonction pour récupérer les données depuis l'API
function fetchCinemas() {
    fetch('https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records')
        .then(response => response.json())
        .then(data => {
            const cinemas = data.results;

            cinemas.sort((a, b) => {
                const fauteuilsA = GetCinemaDistance(a);
                const fauteuilsB = GetCinemaDistance(b);
                return fauteuilsA - fauteuilsB;
            })

            cinemas.forEach(cinema => {
                const li = document.createElement('li');
                li.textContent = `${cinema.nom} - ${cinema.adresse}, ${cinema.commune} - ${GetCinemaDistance(cinema)} Km`;
                cinemaLst.appendChild(li);
            });
            L.mapquest.key = 'KEY';

            // 'map' refers to a <div> element with the ID map
            L.mapquest.map('map', {
                center: [userPos.latitude, userPos.longitude],
                layers: L.mapquest.tileLayer('map'),
                zoom: 12
            });
        }
        )
}

// Appelez la fonction pour récupérer les cinémas au chargement de la page
fetchCinemas();