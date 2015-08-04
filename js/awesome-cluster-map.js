/**
 * 
 * @param {string} tileLayerURL Tile layer URL
 * @param {object} tileLayerOptions Tile layer options
 * @param {object} mapOptions Map options
 * @param {number} maxClusterRadius Max cluster radius in pixel
 */
function AwesomeClusterMap(tileLayerURL, tileLayerOptions, mapOptions, maxClusterRadius) {

	var tileLayerMap = L.tileLayer(tileLayerURL, tileLayerOptions);

	var map = L.map(mapOptions.containerElement, {
		center: mapOptions.center,
		zoom: mapOptions.zoom,
		layers: [tileLayerMap]
	});

	// Remove "Leaflet" attribution prefix
	map.attributionControl.setPrefix(false);

	var markerClusterGroup = L.markerClusterGroup({
		maxClusterRadius: maxClusterRadius
	});
	map.addLayer(markerClusterGroup);			
	
	/**
	 * Creats a marker and adds it to the marker cluster group.
	 * 
	 * @param {array} postion
	 * @param {string} icon
	 * @param {string} color
	 * @param {string} text
	 */
	var createMarker = function(postion, icon, color, text) {
		var marker = L.marker(postion, {
			icon: L.AwesomeMarkers.icon({
				icon: icon,
				markerColor: color
			})
		})
		.bindPopup(text);

		markerClusterGroup.addLayer(marker);
	};
	
	return {
		/**
		 * Converts the given CSV data into marker.
		 * 
		 * @param {string} csvData Data in CSV format
		 * @returns {undefined}
		 */
		convertContent: function(csvData) {
			
			for (var i=0; i<csvData.length; i++) {
				var item = csvData[i].split(',');
				if (item.length === 5) {
					createMarker([item[0], item[1]], item[2], item[3], item[4]);
				}
			}
		} 
	};
}