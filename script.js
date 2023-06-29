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
		streetViewControl: false,
	});

	// Creating the custom markers
	// Name
	// Latitude, Longitude
	// Image URL
	// scaledSize width, height
	const markers = [
		['Place1', 48.788546, 2.365529, 'marker.svg', 40, 53],
		['Place2', 48.789792, 2.368737, 'marker.svg', 38, 42.5],
		['Place3', 48.786800, 2.367346, 'marker.svg', 38, 38],
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
	}
}
