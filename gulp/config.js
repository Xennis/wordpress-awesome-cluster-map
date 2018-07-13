/*global require, module, __dirname */
module.exports = {
	images: {
		src: [
			'node_modules/leaflet/dist/images/*.*',
			'node_modules/leaflet.awesome-markers/dist/images/*.*',
			'node_modules/leaflet-minimap/dist/images/*.*'
		],
		dest: 'dist/images'
	},
	scripts: {
		src: [
			'node_modules/leaflet/dist/leaflet.js',
			'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
			'node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js',
			'node_modules/leaflet-minimap/dist/Control.MiniMap.min.js',
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