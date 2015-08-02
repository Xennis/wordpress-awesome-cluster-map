<?php
/**
 * Admin menu hook: Add pages to menu.
 */
function osmcl_admin_menu() {
    add_options_page('Cluster map', 'Cluster map', 'manage_options', 'osmcl-options', 'osmcl_page_options');
}
add_action('admin_menu', 'osmcl_admin_menu');

/**
 * Page options
 */
function osmcl_page_options() {
	if ( isset ( $_GET['tab'] ) ) {
		$tab = $_GET['tab'];
	} else {
		$tab = 'map';
	}

	$tabs = array(
		'map' => __('Map', OSMCL_NAME),
		'clustering' => __('Clustering', OSMCL_NAME)
	);
?>
<div class="wrap">
    <h2>Awesome Cluster Map <?php _e('Settings'); ?></h2>
	<?php echo osmcl_helper_admin_tabs($_GET['page'], $tabs, $tab); ?>
    <form method="post" action="options.php">
		<?php settings_fields(OSMCL_NAME); ?>
		<?php do_settings_sections(OSMCL_NAME); ?>
        <table class="form-table">
		<?php switch ($tab) {
			case 'map':
?>
           <tr>
                <th><?php _e('Tile layer URL'); ?></th>
                <td><input type="text" name="map_tileLayerURL" class="regular-text" value="<?php echo esc_attr( get_option('map_tileLayerURL') ); ?>" /></td>
            </tr>
            <tr>
                <th><?php _e('Tile layer options'); ?> <?php osmcl_helper_help_link('http://leafletjs.com/reference.html#tilelayer-options'); ?></th>
                <td><textarea name="map_tileLayerOptions" class="large-text" rows="10" cols="50"><?php echo esc_attr( get_option('map_tileLayerOptions') ); ?></textarea></td>
            </tr>
<?php
			break;
			case 'clustering':
?>
           <tr>
			   <th><?php _e('Max cluster radius'); ?> <?php osmcl_helper_help_link('https://github.com/Leaflet/Leaflet.markercluster#all-options'); ?></th>
                <td><input type="number" name="clustering_maxClusterRadius" class="small-text" value="<?php echo esc_attr( get_option('clustering_maxClusterRadius') ); ?>" /> pixel</td>
            </tr>
<?php
			break;
		}
 ?>
        </table>
		<?php submit_button(); ?>
    </form>	
</div>
<?php
}