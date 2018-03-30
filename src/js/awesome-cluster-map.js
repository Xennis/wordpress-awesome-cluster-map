/**
 * AwesomeClusterMap
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
		new L.Control.MiniMap(tileLayerMap, {
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
	 * Creates a marker.
	 * 
	 * @param {array} postion
	 * @param {string} icon
	 * @param {string} color
	 * @param {string} text
	 * @return {L.Marker} Created marker
	 */
	var createMarker = function(position, icon, color, text) {
		return L.marker(position, {
			icon: L.AwesomeMarkers.icon({
				icon: icon,
				markerColor: color
			})
		})
		.bindPopup(text);
	};
	
	/**
	 * Adds a marker to the marker cluster group.
	 * 
	 * @param {L.Marker} marker
	 * @param {boolean} isDuplicate Marker is a duplicate
	 */
	var addMarker = function(marker, isDuplicate) {
			// Add marker's postion to polyline array
		polylineLatLng.push(marker.getLatLng());
		// Add marker to cluster
		if (!isDuplicate) {
			markerClusterGroup.addLayer(marker);
		}
	};
	
	/**
	 * Simple hash function accordingly to Java.
	 * 
	 * @param {string} input
	 * @return {string} Hash code
	 */
	var hashCode = function (input) {
		var hash = 0;
		if (input.length === 0) {
			return hash;
		}
		for (var i = 0; i < input.length; i++) {
			var char = input.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32 bit integer
		}
		return hash;
	};
	
	return {
		/**
		 * Converts the given CSV data into marker.
		 * 
		 * @param {string} csvData Data in CSV format
		 * @param {boolean} ignoreDuplicates Ignore duplicate marker
		 */
		convertContent: function(csvData, ignoreDuplicates) {
			var itemHashes = [];
			for (var i=0; i<csvData.length; i++) {
				var item = csvData[i];
				var isDuplicate = false;
				
				if (ignoreDuplicates) {
					var itemHash = hashCode(item);
					if (itemHashes.includes(itemHash)) {
						isDuplicate = true;
					} else {
						itemHashes.push(itemHash);
					}
				}
				
				var itemValues = item.split(',');
				if (itemValues.length === 5) {
					var marker = createMarker([itemValues[0], itemValues[1]], itemValues[2], itemValues[3], itemValues[4], isDuplicate);
					addMarker(marker, isDuplicate);
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