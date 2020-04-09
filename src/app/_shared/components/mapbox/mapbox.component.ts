import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from './mapbox.service';
import { GeoJson, FeatureCollection } from '../../interfaces/_index';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  @Input() lat: number;
  @Input() lon: number;

  // data
  source: any;
  markers: any;

  constructor(
    private mapboxService: MapboxService
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    // this.markers = this.mapboxService.getMarkers();
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lon, this.lat]
    });
  }

  initializeMap() {
    // locate the user
    // if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(position => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //     this.map.flyTo({
    //       center: [this.lng, this.lat]
    //     });
    //   });
    // }

    this.buildMap();

  }

  buildMap() {



    // /// Add map controls
    // this.map.addControl(new mapboxgl.NavigationControl());


    // //// Add Marker on Click
    // this.map.on('click', (event) => {
    //   const coordinates = [event.lngLat.lng, event.lngLat.lat]
    //   const newMarker   = new GeoJson(coordinates, { message: this.message })
    //   this.mapboxService.createMarker(newMarker)
    // })


    // /// Add realtime firebase data on map load
    // this.map.on('load', (event) => {

    //   /// register source
    //   this.map.addSource('firebase', {
    //      type: 'geojson',
    //      data: {
    //        type: 'FeatureCollection',
    //        features: []
    //      }
    //   });

    //   /// get source
    //   this.source = this.map.getSource('firebase')

    //   /// subscribe to realtime database and set data source
    //   this.markers.subscribe(markers => {
    //       let data = new FeatureCollection(markers)
    //       this.source.setData(data)
    //   })

    //   /// create map layers with realtime data
    //   this.map.addLayer({
    //     id: 'firebase',
    //     source: 'firebase',
    //     type: 'symbol',
    //     layout: {
    //       'text-field': '{message}',
    //       'text-size': 24,
    //       'text-transform': 'uppercase',
    //       'icon-image': 'rocket-15',
    //       'text-offset': [0, 1.5]
    //     },
    //     paint: {
    //       'text-color': '#f16624',
    //       'text-halo-color': '#fff',
    //       'text-halo-width': 2
    //     }
    //   });

    // });

  }


}