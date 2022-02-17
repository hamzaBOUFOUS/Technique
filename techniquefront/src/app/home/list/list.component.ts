import { Component, OnInit } from '@angular/core';
import { GpsService } from 'src/services/gps.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public totalPages : Array<number>;
  public page = 0;
  public list;
  public lenList = 0;
  constructor(private gpsService: GpsService) { }

  ngOnInit(): void {
    this.listCoord(this.page);
  }

  listCoord(index): void {
    this.gpsService.getPageCoord(index, 20).subscribe((data) => {
      this.list = data['content'];
      this.totalPages  = new Array(data['totalPages']);
      this.lenList = data['content']['length'];
    }, (err) => {
      console.log(err.toString());
    });
  }

  nextPage(index) {
    this.page = index;
    this.listCoord(index);
  }

}
