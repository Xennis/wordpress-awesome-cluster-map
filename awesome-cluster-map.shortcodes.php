<?php
/**
 * Shortcode to create a cluster map. 
 * @param array $atts
 * @param string $content
 * @return string
 */
function cluster_map($atts, $content) {
    $a = shortcode_atts( array(
        'height' => '500px',
		'width' => '100%',
		'center' => '[0, 0]',
		'zoom' => 3,
		'line' => 'false'
	), $atts);
	
	// Convert strings into JSON arrays, so that JavaScript can handle it
	$a['center'] = json_encode(explode(',', $a['center']));
	$content = json_encode(explode(PHP_EOL, strip_tags($content, '<a><img>')));

	// Get user options
	$tileLayerURL = get_option('map_tileLayerURL');
	$tileLayerOptions = get_option('map_tileLayerOptions');
	$maxClusterRadius = get_option('clustering_maxClusterRadius');
	
	return <<<HTML
<div id="map" style="width: {$a['width']}; height: {$a['height']};"></div>
<script>
	var clusterMap = AwesomeClusterMap('{$tileLayerURL}', {$tileLayerOptions}, {
		containerElement: 'map',
		center: {$a['center']},
		zoom: {$a['zoom']}
	}, {$maxClusterRadius});

	clusterMap.convertContent({$content});
	if ({$a['line']}) {
		clusterMap.createPolyline();
	}
</script>
HTML;
}
add_shortcode('cluster_map', 'cluster_map');