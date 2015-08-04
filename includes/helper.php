<?php
/**
 * Helper function, which returns the absolute URL of the given resource in the
 * Bower folder.
 * 
 * @category Helper
 * 
 * @param string $path Path relative to the Bower folder
 * @return string Absolute path of the resource
 */
function acm_helper_getBowerResource($path) {
	return plugins_url('../js/bower_components'.$path, __FILE__);
}

/**
 * Outputs a help symbol, which links to the given link.
 * 
 * @category helper
 * 
 * @param string $link URL
 */
function acm_helper_help_link($link) {
	echo '<a href="'.$link.'" target="_blank"><div class="dashicons dashicons-editor-help"></div></a>';
}

/**
 * 
 * @category helper
 * 
 * @param string $page Page, i.e. value from the URL page attribute
 * @param array $tabs All tabs
 * @param string $current Current tab
 */
function acm_helper_admin_tabs($page, array $tabs, $current = NULL){
    echo '<h2 class="nav-tab-wrapper">';
    foreach($tabs as $anchor => $name){
		$class = ($anchor == $current) ? ' nav-tab-active' : '';
       echo '<a class="nav-tab'.$class.'" href="?page='.$page.'&tab='.$anchor.'">'.$name.'</a>';
    }
    echo '</h2>';
}