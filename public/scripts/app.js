var map;
function initMap() {

  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done((maps) => {

    var toronto = {lat:43, lng:-79};

    gmap = new google.maps.Map(document.getElementById('map'), {
      center: {lat:0, lng: 0},
      zoom: 8
    });

    for(let point of maps) {
      let markerDot = {lat:Number(point.latitude), lng:Number(point.longitude)};
      let marker = new google.maps.Marker({
        position: markerDot,
        map: gmap
      });
    }

  });
}


