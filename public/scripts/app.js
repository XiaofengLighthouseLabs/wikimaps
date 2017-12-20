var map;
function initMap() {

  $.ajax({
    method: "GET",
    url: "/api/markers" //TODO change the call to /api/:id(map)/markers so that we only get the relevant markers
  }).done((maps) => {

    //DRAW THE GOOGLE MAP
    gmap = new google.maps.Map(document.getElementById('map'), {
      center: {lat:0, lng: 0}, //TODO make a relevant center depending on the map
      zoom: 8
    });

    //Looks at all of the markers from the map DB
    for(let point of maps) {
      //Gets the longitude and latitude of the current marker
      let markerDot = {lat:Number(point.latitude), lng:Number(point.longitude)};
      //Draws the marker on the map
      let marker = new google.maps.Marker({
        position: markerDot,
        map: gmap
      });
    }

  });
}


