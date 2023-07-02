let map, infoWindow;

function initMap() {
	// Update MAP_ID with custom map ID
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			//lat: 34.66767774804736,
			//lng: 135.43076145097373,
			lat:48.788527,
			lng:2.363723
		},
		zoom: 15,
		mapId: 'c429a4ae566f8257',

		//Removing the UI
		mapTypeControl: false,
		fullscreenControl: false,
		//streetViewControl: false,
        scrollwheel: true, // Enable scrollwheel zooming
		gestureHandling: "greedy" // Allows to move the map with one finger on mobile
	});

	placeMarkers(map)

	//Button to center on the current location of the user
	infoWindow = new google.maps.InfoWindow();
	const locationButton = document.createElement("button");

	locationButton.textContent = "Centrer sur ma position";
	locationButton.classList.add("custom-map-control-button");
	map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
	locationButton.addEventListener("click", () => {
	  // Try HTML5 geolocation.
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		  (position) => {
			const pos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude,
			};
			map.setCenter(pos);
		  },
		  () => {
			handleLocationError(true, infoWindow, map.getCenter());
		  }
		);
	  } else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	  }
	});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
	  browserHasGeolocation
		? "Error: The Geolocation service failed."
		: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}

function placeMarkers(map) {
	// Creating the custom markers
	// Name
	// Latitude, Longitude
	// Image URL
	// scaledSize width, height
	const markers = [
		['<a href="https://goo.gl/maps/w3y1SmrrhnHiNfnt7" target="_blank" class="text-blue-500">Franprix Villejuif</a><p>7 Av. de la République</p><p>94800 Villejuif</p><br><p class="font-bold">Caractéristiques :</p><p>Caméra</p><p>Surveillance physique</p><p>Couvert</p><p>Stockage nocturne</p>', 48.788546, 2.365529],
		['<a href="https://goo.gl/maps/qLjQbPaiFMbgch1T6" target="_blank" class="text-blue-500">Efrei Paris</a><p>30-32 Av. de la République</p><p>94800 Villejuif</p><br><p class="font-bold">Caractéristiques :</p><p>Caméra</p><p>Surveillance physique</p><p>Couvert</p><p>Stockage nocturne</p><p>Arceau</p><p>Accès public limité</p>', 48.788527, 2.363702],
		['<a href="https://goo.gl/maps/2krY1aTWCVtzy49w8" target="_blank" class="text-blue-500">McDonald Villejuif</a><p>123 Bd Maxime Gorki</p><p>94800 Villejuif</p><br><p class="font-bold">Caractéristiques :</p><p>Caméra</p><p>Surveillance physique</p><p>Couvert</p>', 48.791912, 2.369734],
	];

	// Adding the markers to the map
	for (let i = 0; i < markers.length; i++) {
		const currMarker = markers[i];
		const marker = new google.maps.Marker({
			position: { lat: currMarker[1], lng: currMarker[2] },
			map,
			title: currMarker[0],
			icon: {
				url: currMarker[3],
				scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
			},
			animation: google.maps.Animation.DROP,
		});
		const infowindow = new google.maps.InfoWindow({
			content: currMarker[0],
		});

		// Display the info window on marker click
		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});

		// Close the info window when clicking outside of it
		window.addEventListener('click', (event) => {
			if (!infowindow.getContent().includes(event.target)) {
			  infowindow.close();
			}
		  });
	}
}