<?php
/*
 * Shortcode to create a cluster map. 
 */
add_shortcode('cluster_map', 'cluster_map');
function cluster_map($atts, $content = null) {
    $a = shortcode_atts( array(
        'height' => '500px',
		'width' => '100%',
		'center' => '[0, 0]',
		'zoom' => 3
	), $atts);
	
	// Convert strings into JSON arrays, so that JavaScript can handle it
	$a['center'] = json_encode(explode(',', $a['center']));
	$content = json_encode(explode(PHP_EOL, strip_tags($content, '<a><img>')));
	
	return <<<HTML
<style>
	#map {
		width: {$a['width']};
		height: {$a['height']}; 
	}
</style>
<div id="map"></div>
<script>
	var clusterMap = OSMClusterMap({
		url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.jpg',
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
		subdomains: '1234'
	}, {
		containerElement: 'map',
		center: {$a['center']},
		zoom: {$a['zoom']}
	});

	clusterMap.convertContent({$content});
</script>
HTML;
}