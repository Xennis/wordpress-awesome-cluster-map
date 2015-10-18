/*global require, module, __dirname */
module.exports = {
	scripts: {
		src: [
			'bower_components/leaflet/dist/leaflet.js',
			'bower_components/leaflet.markerclusterer/dist/leaflet.markercluster.js',
			'bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js',
			'node_modules/leaflet-minimap/dist/Control.MiniMap.min.js',
			'src/js/awesome-cluster-map.js',
		],
		dest: 'dist/',
		name: 'awesome-cluster-map.min.js'
	},	
	styles: {
		src: 'src/less/awesome-cluster-map.less',
		dest: 'dist/style/'
	},
	watch: {
		styles: 'src/less/*.less',
		scripts: 'src/js/*.js'
	}
};