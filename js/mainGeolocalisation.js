import {haversine} from "./utils/math.js"

function GetPosition()
{
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => 
        {
            resolve(position.coords);
        });
    });
}

export let userPos = {};
await GetPosition().then(pos => 
{
    userPos.latitude = pos.latitude;
    userPos.longitude = pos.longitude;
});

export function GetCinemaDistance(cinemaPos)
{
    return haversine([userPos.latitude, userPos.longitude], [cinemaPos.geolocalisation.lat, cinemaPos.geolocalisation.lon]).toFixed(2);
}
