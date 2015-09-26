/**
 * 
 * @param {string} tileLayerURL Tile layer URL
 * @param {object} tileLayerOptions Tile layer options
 * @param {object} mapOptions Map options
 * @param {number} maxClusterRadius Max cluster radius in pixel
 */
function AwesomeClusterMap(tileLayerURL, tileLayerOptions, mapOptions, maxClusterRadius) {

	// Setup tile layer and map
	var tileLayerMap = L.tileLayer(tileLayerURL, tileLayerOptions);
	var map = L.map(mapOptions.containerElement, {
		center: mapOptions.center,
		zoom: mapOptions.zoom,
		layers: [tileLayerMap]
	});

	// Remove "Leaflet" attribution prefix
	map.attributionControl.setPrefix(false);

	// Add minimap
	if (mapOptions.minimap) {
		var tileLayerMap = L.tileLayer(tileLayerURL, tileLayerOptions);
		var miniMap = new L.Control.MiniMap(tileLayerMap, {
			toggleDisplay: true
		}).addTo(map);
	}

	// Setup cluster group
	var markerClusterGroup = L.markerClusterGroup({
		maxClusterRadius: maxClusterRadius
	});
	map.addLayer(markerClusterGroup);	
	
	// Setup polyline
	var polylineLatLng = [];
	
	/**
	 * Creats a marker and adds it to the marker cluster group.
	 * 
	 * @param {array} postion
	 * @param {string} icon
	 * @param {string} color
	 * @param {string} text
	 */
	var createMarker = function(postion, icon, color, text) {
		// Create marker
		var marker = L.marker(postion, {
			icon: L.AwesomeMarkers.icon({
				icon: icon,
				markerColor: color
			})
		})
		.bindPopup(text);
		// Add marker's postion to polyline array
		polylineLatLng.push(marker.getLatLng());
		// Add marker to cluster
		markerClusterGroup.addLayer(marker);
	};
	
	return {
		/**
		 * Converts the given CSV data into marker.
		 * 
		 * @param {string} csvData Data in CSV format
		 */
		convertContent: function(csvData) {
			for (var i=0; i<csvData.length; i++) {
				var item = csvData[i].split(',');
				if (item.length === 5) {
					createMarker([item[0], item[1]], item[2], item[3], item[4]);
				}
			}
		},
		/**
		 * Creates a polyline by the positions of all previous added markers.
		 */
		createPolyline: function() {
			L.polyline(polylineLatLng, {
				color: 'black',
				fillOpacity: '0.9'
			}).addTo(map);
		}
	};
}