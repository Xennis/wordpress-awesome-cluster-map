<?php
/*
Plugin Name: OpenStreetMap Cluster Map
Plugin URI: 
Description: Create awesome marker cluster maps with OpenStreetMap (Leaflet)
Version: 0.0.1
Author: Xennis
Text Domain: osm-cluster-map
*/

/**
 * Plugin name
 */
define('OSMCL_NAME', dirname(plugin_basename( __FILE__ )));
/**
 * Plugin directory 
 */
define('OSMCL_DIR', WP_PLUGIN_DIR.'/'.OSMCL_NAME);

/**
 * Helper function, which returns the absolute URL of the given resource in the
 * Bower folder.
 * 
 * @category Helper
 * @param string $path Path relative to the Bower folder
 * @return string Absolute path of the resource
 */
function osmcl_getBowerResource($path) {
	return plugins_url('/js/bower_components'.$path, __FILE__);
}

/*
 * Enqueue scripts and styles.
 */
add_action('wp_enqueue_scripts', 'osmcl_enqueue_scripts');
function osmcl_enqueue_scripts() {

	// Style
	wp_enqueue_style('bootstrap', osmcl_getBowerResource('/bootstrap-css-only/css/bootstrap.min.css'));	
	wp_enqueue_style('leaflet', osmcl_getBowerResource('/leaflet/dist/leaflet.css'));
    wp_enqueue_style('MarkerCluster', osmcl_getBowerResource('/leaflet.markerclusterer/dist/MarkerCluster.css'));
    wp_enqueue_style('MarkerCluster.Default', osmcl_getBowerResource('/leaflet.markerclusterer/dist/MarkerCluster.Default.css'));
	wp_enqueue_style('Leaflet.awesome-markers', osmcl_getBowerResource('/Leaflet.awesome-markers/dist/leaflet.awesome-markers.css'));	

	// Script
    wp_enqueue_script('leaflet', osmcl_getBowerResource('/leaflet/dist/leaflet.js'));
    wp_enqueue_script('leaflet.markerclusterer', osmcl_getBowerResource('/leaflet.markerclusterer/dist/leaflet.markercluster.js'));
    wp_enqueue_script('Leaflet.awesome-markers', osmcl_getBowerResource('/Leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js'));
    wp_enqueue_script(OSMCL_NAME, plugins_url('/js/osm-cluster-map.js', __FILE__));
}

require_once(OSMCL_DIR.'/'.OSMCL_NAME.'.shortcodes.php');