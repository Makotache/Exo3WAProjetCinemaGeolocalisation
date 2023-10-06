import {GetCinemaDistance} from "./mainGeolocalisation.js"

const cinemaLst = document.getElementById("cinemaLst");
const pagination = document.getElementById("pagination");
let cinemas = [];


function LoadPage(pageNumber)
{
    const countCinemasPerPage = 10;
    const countMaxPage = Math.ceil(cinemas.length / countCinemasPerPage);

    let paginationHTML = "";
    //bouton précédant
    if (pageNumber > 1)
    {
        paginationHTML += "<button id='previous' class='div-btn-red'>Précédant</button>";
    }

    //bouton page 1 2 [3]
    for (let page_index = Math.max(pageNumber - 2, 1); page_index < pageNumber + 3; page_index++)
    {
        //si page_index est celle actuel
        if (pageNumber == page_index)
        {
            //bouton en vert
            paginationHTML += `<button class='div-btn-green'>${page_index}</button>`;
        }
        //si l'addition du nombre des cinémas précédant sont inférieur au nombre de cinéma total
        else if (page_index <= countMaxPage)
        {
            //bouton en bleu
            paginationHTML += `<button class='div-btn-blue'>${page_index}</button>`;
        }
        else
        {
            break;
        }
    }

    if (pageNumber + 1 <= countMaxPage)
    {
        paginationHTML += "<button id='next' class='div-btn-red'>Suivant</button>"
    }

    pagination.innerHTML = paginationHTML;

    //on ajout un event a chaque bouton bleu
    const blueBtns = document.getElementsByClassName("div-btn-blue");
    for (const btn of blueBtns) {
        btn.addEventListener("click", () => LoadPage(parseInt(btn.innerHTML)));
    }

    //on ajout un event a chaque bouton rouge
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");

    previous?.addEventListener("click", () => LoadPage(Math.max(parseInt(pageNumber - 1), 1)));
    next?.addEventListener("click", () => LoadPage(Math.min(parseInt(pageNumber + 1), countMaxPage)));

    //chargement des cinemas
    cinemaLst.innerHTML = "";
    for (let i = 0; i < countCinemasPerPage; i++)
    {
        let cinema = cinemas[i + (pageNumber - 1) * 10];
        if(cinema == undefined)
        {
            break;
        }

        const li = document.createElement('li');
        li.textContent = `${cinema.nom} - ${cinema.adresse}, ${cinema.commune} - ${GetCinemaDistance(cinema)} Km`;
        cinemaLst.appendChild(li);
    }   
}




// Fonction pour récupérer les données depuis l'API
function fetchCinemas() {
    fetch('https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?limit=-1')
        .then(response => response.json())
        .then(data => {
            cinemas = data.results;

            cinemas.sort((a, b) => {
                const fauteuilsA = a.fauteuils || 0;
                const fauteuilsB = b.fauteuils || 0;
                return fauteuilsB - fauteuilsA;
            })
            LoadPage(1);
        }
)}

// Appelez la fonction pour récupérer les cinémas au chargement de la page
window.addEventListener('load', fetchCinemas);
