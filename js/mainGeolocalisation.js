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

let userPos = {};
await GetPosition().then(pos => 
{
    userPos.latitude = pos.latitude;
    userPos.longitude = pos.longitude;
});
console.log(userPos);

export function GetCinemaDistance(cinemaPos)
{
    return haversine([userPos.latitude, userPos.longitude], [cinemaPos.geolocalisation.lat, cinemaPos.longitude+1])
}
