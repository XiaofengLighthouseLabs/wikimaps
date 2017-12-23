const allMarkers = []; //stores all the markers on the map for editting and deleting.
let currentMap = 3;
let map;
//THE ALL IMPORTANT MAP DRAWING FUNCTION
const initMap = (id) => {
  if (!id) {
    id = currentMap;
  } else {
    currentMap = id;
  }
console.log(id);
  $.ajax({
    method: "GET",
    url: `/api/${id}/markers` //TODO change the call to /api/:id(map)/markers so that we only get the relevant markers
  }).done((maps) => {

    //DRAW THE GOOGLE MAP
    gmap = new google.maps.Map(document.getElementById('map'), {
      center: {lat:43, lng: -79.3}, //TODO make a relevant center depending on the map
      zoom: 4
    });
//single click to add a new point
    gmap.addListener('click', function(e) {
              placeMarkerAndPanTo(e.latLng, gmap);

            });

//make a new info window
    function placeMarkerAndPanTo(latLng, map) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);
      console.log(Number(marker.getPosition().lat()));

      let infoWindow = new google.maps.InfoWindow({
        content: generateNewInforWindowContent(marker.getPosition().lat(), marker.getPosition().lng())
      });
//Makes infowindow appear on marker click
      infoWindow.open(gmap, marker);
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
          });
    }

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
        content: generateInforWindowContent(point.description, point.title, point.id, point.image_url) //TODO might want to a variable that holds template literal variable for <divs> and classes to make styling easier

      });

      //Makes infowindow appear on marker click
      marker.addListener('click', function() {
        infoWindow.open(gmap, marker);


      });
    }

  });
}

const logMarker = (e) => {
  e.preventDefault();
  console.log(e.target.id);
  console.log($(e.target).serialize());
}

const generateInforWindowContent = (description, title, id, image_url) => {
  //Returns the HTML for the infoWindow
  return `
      <form class="info-window" id="${id}" onsubmit=editMarker(event)>
        <input type="hidden" value="${id}" name="form_id" />
        <h3>
          <textarea name='title'>${title}</textarea>
        </h3>
        <div>
          <textarea name='description'>${description}</textarea>
        </div>
        <div>
          <img src=${image_url} name='image_url' />
        </div>
        <div>
          <button class="btn">edit</button>
          <button class="btn" onclick=deleteMarker(${id})>delete</button>
        </div>
      </form>
    `;
};

const generateNewInforWindowContent = (lat, lng) => {

  //Returns the HTML for the infoWindow
  return `
      <form onsubmit=addMarker(event)>
        <input type="hidden" value="${lat}" name="lat" />
        <input type="hidden" value="${lng}" name="lng" />
        <h3>
          <textarea name='title' placeholder='Your new map title'></textarea>
        </h3>
        <div>
          <textarea name='description' placeholder='Your description'></textarea>
        </div>
        <div>
          <textarea name='image_url' placeholder='Image'></textarea>
        </div>
        <div>
          <button class="btn">save</button>
        </div>
      </form>
    `;
};

const deleteMarker =  (id) => {
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

const editMarker = (event) => {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "/api/1/markers/edit",
    data: $(event.target).serialize(),
      success: console.log("updated")

  });
};

const addMarker = (event) => {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "api/1/markers/new",
    data: $(event.target).serialize(),
      success: console.log("created new point")
  }).done((results) => {
    contribution();
  });
};

const getFaves = () => {
  $.ajax({
    method: "GET",
    url: "/api/1/markers/faves"
  }).done((results) => {
    $("#faves").empty();
    for (let fav of results) {
    $('#faves').append(`<li data-map_id="${fav.map_id}" onclick="getMap(event)">${fav.title}</li>`);
    }
  });
};

getFaves();

const getMap = (event) => {
  console.log($(event.target).data("map_id"));
    initMap(Number($(event.target).data("map_id")));
};

const addFav = () => {
  $.ajax({
    method: "POST",
    url: `/api/${currentMap}/markers/faves`
  }).done((results) => {
    getFaves();
  });
};

const contribution = () => {
  $.ajax({
    method: "GET",
    url: "/api/1/markers/contributions"
  }).done((results) => {
    $("#contributions").empty();
    for (let contribution of results) {
    $('#contributions').append(`<li>${results[0].title}</li>`);
    }
  });
};

contribution();

initMap(currentMap);





