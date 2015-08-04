# WordPress Plugin Awesome Cluster Map (OpenStreetMap, Leaflet)

WordPress plugin to create awesome marker cluster maps with OpenStreetMap (OSM).
This plugin is build with [Leaflet](http://leafletjs.com/) as OSM JavaScript
library and [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
and [Leaflet.awesome-markers](https://github.com/lvoogdt/Leaflet.awesome-markers)
to cluster pretty markers.

### Setup

Install requirements

* `bower install`

### Usage

#### Example

Lets create a map with the initial center of the location 50 latitude and 0
longitude and add three markers to this map:
```
[cluster_map center="50,0" zoom=3 height="500px"]
45.3,0.25,glass,red,My first marker
45.25,0.2,leaf,blue,Another marker with a <a href="#example">link</a>
45.3,0.3,wrench,green,My first marker
[/cluster_map]
```

The markers are in CSV format:

* latitude
* longitude
* icon ([Bootstraps glyphicons](http://getbootstrap.com/components/#glyphicons), e.g. use `glass`)
* color of the marker (e.g. `red`)
* text for the popup

![example_cluster_map](_screenshots/1.png)

![example_cluster_map](_screenshots/2.png)