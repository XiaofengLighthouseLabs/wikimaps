var map;
function initMap() {

  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done((maps) => {
    // for(let map of maps) {
      const map = maps[0];
      const markerDot = {lat:Number(map.latitude), lng:Number(map.longitude)};
    // }

    var toronto = {lat:43, lng:-79};

console.log(markerDot);
    gmap = new google.maps.Map(document.getElementById('map'), {
      center: {lat:0, lng: 0},
      zoom: 8
    });


    let marker = new google.maps.Marker({
      position: markerDot,
      map: gmap
    });

  });





}


