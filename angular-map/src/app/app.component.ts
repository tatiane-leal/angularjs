import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  map: any;

  geojsonObject = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.0059728, 40.712776], // New York
        },
        properties: {
          name: 'New York',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-124.848974, 32.39596],
              [-114.130814, 32.792569],
              [-114.516449, 33.277427],
              [-123.233256, 38.907617],
              [-124.848974, 32.39596],
            ],
          ], // California
        },
        properties: {
          name: 'California',
        },
      },
    ],
  };

  title = 'angular-map';

  ngOnInit(): void {
    let drawSource = new VectorSource();
    let drawLayer = new VectorLayer({
      source: drawSource,
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(this.geojsonObject, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857',
            }),
          }),
        }),
        drawLayer, // Add the draw layer here
      ],
      view: new View({
        center: fromLonLat([-95, 40]),
        zoom: 4,
      }),
    });

    let draw = new Draw({
      source: drawSource,
      type: 'Polygon', // Change this to 'Circle', 'LineString', etc. as needed
    });
    this.map.addInteraction(draw);

    let modify = new Modify({
      source: drawSource,
    });
    this.map.addInteraction(modify);
  }
}

/*
  So, the draw/modify layer also goes on top and once user draw, we can get the geojson data to save to db and also retrieve this geojson data
  from the db, parse it and load on the map
*/
