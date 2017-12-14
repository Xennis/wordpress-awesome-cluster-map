<?php
/*
Plugin Name: Awesome Cluster Map
Plugin URI: https://github.com/Xennis/awesome-cluster-map
Description: Create awesome marker cluster maps with OpenStreetMap (Leaflet)
Version: 1.0.0
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
require_once(ACM_DIR.'/'.ACM_NAME.'.helper.php');

/**
 * Admin init: register settings
 */
function acm_admin_init() {
	$settings = array(
		'map_tileLayerURL' => 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		'map_tileLayerOptions' => '{
attribution: \'&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors\'
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

	// Style and script
	wp_enqueue_style('acm-style', plugins_url('dist/awesome-cluster-map.min.css', __FILE__ ) );
	wp_enqueue_script('acm-script', plugins_url('dist/awesome-cluster-map.min.js', __FILE__ ) );
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

/**
 * Include scripts
 */
require_once(ACM_DIR.'/'.ACM_NAME.'.shortcodes.php');
require_once(ACM_DIR.'/'.ACM_NAME.'.pages.php');