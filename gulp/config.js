/*global require, module, __dirname */
module.exports = {
	images: {
		src: [
			'bower_components/leaflet/dist/images/*.*',
			'bower_components/Leaflet.awesome-markers/dist/images/*.*',
			'bower_components/leaflet-minimap/dist/images/*.*'
		],
		dest: 'dist/images'
	},
	scripts: {
		src: [
			'bower_components/leaflet/dist/leaflet.js',
			'bower_components/leaflet.markerclusterer/dist/leaflet.markercluster.js',
			'bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js',
			'bower_components/leaflet-minimap/dist/Control.MiniMap.min.js',
			'src/js/awesome-cluster-map.js'
		],
		dest: 'dist/',
		name: 'awesome-cluster-map.min.js'
	},	
	styles: {
		src: 'src/less/awesome-cluster-map.less',
		dest: 'dist/'
	},
	watch: {
		styles: 'src/less/*.less',
		scripts: 'src/js/*.js'
	}
};