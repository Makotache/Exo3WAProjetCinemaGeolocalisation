

function getCoords() 
{
    return fetch("https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port")
        .then(response => response.json()
    );    
}

function getAddressFromCoords(lat, lon)
{
    //            https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357
    return fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`)
        .then(response => response.json()
    );
}

function getAddress(lat, lon) 
{
    return getAddressFromCoords(lat, lon)
        .then(response => response.features[0].properties.label
    );
}

const main = async () => 
{
    console.log(await getCoords());
    console.log(await getAddressFromCoords(48.357, 2.37));
    console.log(await getAddress(48.357, 2.37));
}

main();