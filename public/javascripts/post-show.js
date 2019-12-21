mapboxgl.accessToken = "pk.eyJ1IjoidGVscmlvdCIsImEiOiJjazRmYTV2Z2Ywa2xsM2ZvMjM2eHo1c2dvIn0.op4by5WYU_qeXFv-ri7EjA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: post.coordinates,
  zoom: 9
});

// create a HTML element for our post location marker
let el = document.createElement("div");
el.className = "marker";

// make a marker for our location add to the map
new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML("<h3>" + post.title + "</h3><p>" + post.location + "</p>")
  )
  .addTo(map);
