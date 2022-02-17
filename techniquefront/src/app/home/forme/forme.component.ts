import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GpsService } from 'src/services/gps.service';

@Component({
  selector: 'app-forme',
  templateUrl: './forme.component.html',
  styleUrls: ['./forme.component.css']
})
export class FormeComponent implements OnInit {

  private uploadfile: File;
  constructor(private gpsService: GpsService, private router: Router) { }

  ngOnInit(): void {}

  selectFile(event): void {
    this.uploadfile = event.target.files[0];
  }

  upload(): void{
    this.gpsService.uploadCoord(this.uploadfile).subscribe((res) => {
      this.router.navigate(['home/map']);
    }, (err) => {
        console.log(err);
    });
  }

}
