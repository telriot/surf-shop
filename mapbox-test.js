require("dotenv").config();
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

async function geocoder(location){
    try {
        let response = await geocodingClient
    .forwardGeocode({
      query: req.body.post.location,
      limit: 1
    })
    .send();
    console.log(response.body.features[0].geometry.coordinates)
} catch (err) {
    console.log(err)
}
}

geocoder("Prato, Italy")
//   .then(response => {
//     const match = response.body;
//     console.log(match.features[0].geometry.coordinates);
//   });
