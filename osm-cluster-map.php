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
require_once(OSMCL_DIR.'/'.OSMCL_NAME.'.helper.php');

/**
 * Admin init: register settings
 */
function osmcl_admin_init() {
	$settings = array(
		'map_tileLayerURL' => 'http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.jpg',
		'map_tileLayerOptions' => '{
type: \'map\',
attribution: \'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">\',
subdomains: \'1234\'
}',
		'clustering_maxClusterRadius' => 80
	);
	
	foreach ($settings as $key => $value) {
		register_setting(OSMCL_NAME, $key);
		
		if( !get_option( $key ) ) {
			update_option($key, $value);
		}
	}
} 
add_action('admin_init', 'osmcl_admin_init');

/**
 * Enqueue scripts and styles.
 */
function osmcl_enqueue_scripts() {

	// Style
	wp_enqueue_style('osmcl_bootstrap_glyphicons', 'http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css');	
	wp_enqueue_style('osmcl_leaflet', osmcl_helper_getBowerResource('/leaflet/dist/leaflet.css'));
    wp_enqueue_style('osmcl_leaflet_markercluster', osmcl_helper_getBowerResource('/leaflet.markerclusterer/dist/MarkerCluster.css'));
    wp_enqueue_style('osmcl_leaflet_markercluster_default', osmcl_helper_getBowerResource('/leaflet.markerclusterer/dist/MarkerCluster.Default.css'));
	wp_enqueue_style('osmcl_leaflet_awesome_markers', osmcl_helper_getBowerResource('/Leaflet.awesome-markers/dist/leaflet.awesome-markers.css'));	

	// Script
    wp_enqueue_script('osmcl_leaflet', osmcl_helper_getBowerResource('/leaflet/dist/leaflet.js'));
    wp_enqueue_script('osmcl_leaflet_markercluster', osmcl_helper_getBowerResource('/leaflet.markerclusterer/dist/leaflet.markercluster.js'));
    wp_enqueue_script('osmcl_Leaflet_awesome_markers', osmcl_helper_getBowerResource('/Leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js'));
    wp_enqueue_script(OSMCL_NAME, plugins_url('/js/osm-cluster-map.js', __FILE__));
}
add_action('wp_enqueue_scripts', 'osmcl_enqueue_scripts');

/*
 * Include scripts
 */
require_once(OSMCL_DIR.'/'.OSMCL_NAME.'.shortcodes.php');
require_once(OSMCL_DIR.'/'.OSMCL_NAME.'.pages.php');