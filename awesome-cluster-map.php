<?php
/*
Plugin Name: Awesome Cluster Map
Plugin URI: https://github.com/XennisBlog/awesome-cluster-map
Description: Create awesome marker cluster maps with OpenStreetMap (Leaflet)
Version: 0.0.1
Author: Xennis
Text Domain: awesome-cluster-map
*/

/**
 * Plugin name
 */
define('ACM_NAME', dirname(plugin_basename( __FILE__ )));
/**
 * Plugin directory 
 */
define('ACM_DIR', WP_PLUGIN_DIR.'/'.ACM_NAME);
require_once(ACM_DIR.'/src/php/helper.php');

/**
 * Admin init: register settings
 */
function acm_admin_init() {
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
		register_setting(ACM_NAME, $key);
		
		if( !get_option( $key ) ) {
			update_option($key, $value);
		}
	}
} 
add_action('admin_init', 'acm_admin_init');

/**
 * Enqueue scripts and styles.
 */
function acm_enqueue_scripts() {

	// Style
	wp_enqueue_style('acm-style', plugins_url('dist/awesome-cluster-map.min.css', __FILE__ ) );	

	// Script
    wp_enqueue_script('acm_leaflet', acm_helper_getBowerResource('/leaflet/dist/leaflet.js'));
    wp_enqueue_script('acm_leaflet_markercluster', acm_helper_getBowerResource('/leaflet.markerclusterer/dist/leaflet.markercluster.js'));
    wp_enqueue_script('acm_Leaflet_awesome_markers', acm_helper_getBowerResource('/Leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js'));
    wp_enqueue_script('acm_Leaflet_minimap', plugins_url('node_modules/leaflet-minimap/dist/Control.MiniMap.min.js', __FILE__) );
	wp_enqueue_script(ACM_NAME, plugins_url('/src/js/'.ACM_NAME.'.js', __FILE__), array('jquery'));	
}
add_action('wp_enqueue_scripts', 'acm_enqueue_scripts');

/**
 * 
 * @param array $links
 */
function acm_plugin_action_links( $links ) {
   $links[] = '<a href="'.admin_url('options-general.php?page=acm-options').'">Settings</a>';
   return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'acm_plugin_action_links');

/*
 * Include scripts
 */
require_once(ACM_DIR.'/'.ACM_NAME.'.shortcodes.php');
require_once(ACM_DIR.'/'.ACM_NAME.'.pages.php');