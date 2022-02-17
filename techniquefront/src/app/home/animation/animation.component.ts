import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { GpsService } from 'src/services/gps.service';
import 'leaflet.animatedmarker/src/AnimatedMarker';

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [13, 41],
  popupAnchor: [2, -40],
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {

  animatedMarker;
  map: any;
  listCoor;
  lenList = 0;

  constructor(private gpsService: GpsService) { }

  ngOnInit(): void {
    this.listCoord();
  }

  private loadMap(): void {
    var arrayPoints: any[] = [];

    this.map = L.map('map').setView([this.listCoor[0]?.['latitude'], this.listCoor[0]?.['longitude']], 10);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJhc2thbSIsImEiOiJja3NqcXBzbWoyZ3ZvMm5ybzA4N2dzaDR6In0.RUAYJFnNgOnn80wXkrV9ZA', {
      attribution: 'Test Technique',
      id: 'mapbox/streets-v11',
    }).addTo(this.map);

    for (let i = 0; i < this.listCoor.length; i++) {
      if (i == 0 || i == this.listCoor.length - 1) {
        arrayPoints.push(new L.LatLng(this.listCoor[i]?.['latitude'], this.listCoor[i]?.['longitude']));
        this.addMarker(this.listCoor[i]?.['latitude'], this.listCoor[i]?.['longitude']);
      }
    }
    this.polyline(arrayPoints);

  }

  private addMarker(lat, long) {
    const marker = new L.Marker([lat, long])
      .setIcon(
        L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png'
        }));
    marker.bindPopup(`<div>latitude: ${lat}</div>` +
      `<div>longitude: ${long}</div>`);
    marker.addTo(this.map);
  }

  private listCoord(): void {
    this.gpsService.getListCoord().subscribe((data) => {
      this.listCoor = data;
      this.lenList = this.listCoor ? this.listCoor.length : 0;
      this.lenList > 0 ? this.loadMap() : "";
    }, (err) => {
      console.log(err.toString());
    });
  }

  private polyline(polylinePoints): void {
    var polyline = L.polyline(polylinePoints).addTo(this.map);
    this.animatedMarker = L.animatedMarker(polyline.getLatLngs(), {
      icon,
      distance: 300,
      interval: 3000,
    });
    this.map.addLayer(this.animatedMarker);
  }

}
