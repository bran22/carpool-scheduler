import { Component, OnInit, OnChanges, AfterViewInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson } from '../../interfaces/_index';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit, AfterViewInit, OnChanges {

  // inputs
  @Input() lat: number;
  @Input() lon: number;
  @Input() showMarker ? = false;  // for setting whether a marker is being provided, default false
  @Input() markerJson?: GeoJson;  // for providing the marker coordinates

  // default settings
  map: mapboxgl.Map;
  mapId: string;
  style = 'mapbox://styles/mapbox/streets-v11';

  mapIsInitialized = false;
  activeMarkers = [];

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    // randomly generate a map container ID so that we can have multiple map instances without colliding
    this.mapId = `map_${Math.floor(Math.random() * 10000000)}`;
  }

  ngAfterViewInit() {
    // initialize map settings
    // need to do this in AfterViewInit so that the generated mapID has time to be initialized in the DOM
    this.map = new mapboxgl.Map({
      container: this.mapId,
      style: this.style,
      zoom: 12,
      center: [this.lon, this.lat]
    });
    this.addClickListener();

    this.mapIsInitialized = true;
    this.ngOnChanges();
  }

  ngOnChanges() {

    // don't draw anything if the map has not finished initializing
    if (this.mapIsInitialized) {

      // if marker is requested...
      if (this.showMarker) {

        // ...and no coords are specified, initialize with map center as coordinates for marker
        if (!this.markerJson) {
          this.markerJson = {
            geometry: {
              coordinates: [this.lon, this.lat],
              type: 'Point'
            },
            type: 'Feature'
          };
        }

        // else, use specified marker coordinates
        this.drawMarker(this.markerJson);
      }

    }

  }

  addClickListener() {
    // https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures-around-point/
    // https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/
    this.map.on('click', event => {
      console.log(event.lngLat.wrap());
    });
  }

  drawMarker(markerJson: GeoJson) {

    // destroy all markers
    this.clearMarkers();

    // create new marker
    const marker = new mapboxgl.Marker({color: '#007ad9'})
    .setLngLat(markerJson.geometry.coordinates)
    .addTo(this.map);

    // add reference to array so we can refer to it later
    this.activeMarkers.push(marker);

    this.flyMapToCoordinates(markerJson.geometry.coordinates);
  }

  clearMarkers() {
    // destroy all markers
    this.activeMarkers.forEach( marker => {
      marker.remove();
    });
  }

  flyMapToCoordinates(lonLat: [number, number]) {
    // move map to the specified coordinates
    this.map.flyTo({
      center: lonLat
    });
  }

}
