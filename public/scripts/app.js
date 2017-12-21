let allMarkers = []; //stores all the markers on the map for editting and deleting.
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

      //Draws the marker on the map
      let marker = new google.maps.Marker({
        markerId: point.id,
        position: markerDot,
        map: gmap
      });
      //Add current marker to allmarkers array
      allMarkers.push(marker);

      //Prepares infowindow
      let infoWindow = new google.maps.InfoWindow({
        content: generateInforWindowContent(point.description, point.title, point.id, marker) //TODO might want to a variable that holds template literal variable for <divs> and classes to make styling easier
      });

      //Makes infowindow appear on marker click
      marker.addListener('click', function() {
        infoWindow.open(gmap, marker);


      });
    }

  });
}

let generateInforWindowContent = (description, title, id, marker) => {
  //Returns the HTML for the infoWindow
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

let deleteMarker =  (id) => {
  //DELETES THE MARKER FROM THE DB - UNCOMMENT TO WORK WITH DB
  // $.ajax({
  //   method: "POST",
  //   url: "/api/markers/delete",
  //   data: $.param({data: id}),
  //   // success: initMap //remove once front end delete works
  // });

  //Looks through the all markers array
  for (let i of allMarkers) {
    //If the current marker in allMarkers has the same id as the id we want to delete
    if (i.markerId == id) {
      //Hide it from the browser
      i.setMap(null);
    }
  }
};

let editMarker = () => {

};

let getFaves = () => {
  $.ajax({
    method: "GET",
    url: "/api/markers/faves"
  }).done((results) => {
    $('#faves').append(`<li>${results[0].title}</li>`);
    console.log(results[0]);
  });
};

getFaves();







