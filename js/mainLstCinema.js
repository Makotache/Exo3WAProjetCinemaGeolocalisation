const cinemaLst = document.getElementById("cinemaLst");

// Fonction pour récupérer les données depuis l'API
function fetchCinemas() {
    fetch('https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const cinemas = data.results;

            cinemas.sort((a, b) => {
                const fauteuilsA = a.fauteuils || 0;
                const fauteuilsB = b.fauteuils || 0;
                return fauteuilsB - fauteuilsA;
            })
            const cinemaList = document.getElementById('cinemaList');

            cinemas.forEach(cinema => {
                const li = document.createElement('li');
                li.textContent = `${cinema.nom} - ${cinema.adresse}, ${cinema.commune}`;
                cinemaLst.appendChild(li);
            });
        }
)}

// Appelez la fonction pour récupérer les cinémas au chargement de la page
window.addEventListener('load', fetchCinemas);
