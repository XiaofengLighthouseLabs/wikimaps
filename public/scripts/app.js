var map;
//THE ALL IMPORTANT MAP DRAWING FUNCTION
function initMap() {

  $.ajax({
    method: "GET",
    url: "/api/markers" //TODO change the call to /api/:id(map)/markers so that we only get the relevant markers
  }).done((maps) => {

    //DRAW THE GOOGLE MAP
    gmap = new google.maps.Map(document.getElementById('map'), {
      center: {lat:0, lng: 0}, //TODO make a relevant center depending on the map
      zoom: 1
    });

    //Looks at all of the markers from the map DB
    for(let point of maps) {
      //Gets the longitude and latitude of the current marker
      let markerDot = {lat:Number(point.latitude), lng:Number(point.longitude)};

      //Prepares infowindow
      let infoWindow = new google.maps.InfoWindow({
        content: generateInforWindowContent(point.description, point.title, point.id) //TODO might want to a variable that holds template literal variable for <divs> and classes to make styling easier
      });

      //Draws the marker on the map
      let marker = new google.maps.Marker({
        position: markerDot,
        map: gmap
      });

      //Makes infowindow appear on marker click
      marker.addListener('click', function() {
        infoWindow.open(gmap, marker);
      });
    }

  });
}

let generateInforWindowContent = (description, title, id) => {
  return `
      <h3>${title}</h3>
      <div>
        ${description}
      </div>
      <div>
        <button class="btn" onclick=editMarker()>edit</button>
        <button class="btn" onclick=deleteMarker(${id})>delete</button>
      </div>
    `;
};

let deleteMarker = (id) => {
  console.log(id);
  $.ajax({
    method: "POST",
    url: "/api/markers/delete",
    data: $.param({data: id}),
    success: initMap
  });
};

let editMarker = () => {

};