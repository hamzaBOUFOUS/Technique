import { Component, OnInit } from '@angular/core';
import { GpsService } from 'src/services/gps.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public list;
  public lenList = 0;
  constructor(private gpsService: GpsService) { }

  ngOnInit(): void {
    this.listCoord();
  }

  listCoord():void{
    this.gpsService.getListCoord().subscribe((data) => {
      this.list = data;
      this.lenList = this.list?this.list.length:0;
    }, (err) => {
      console.log(err.toString());
    });
  }

}
