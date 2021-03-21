import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  numTypes!: number;

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.numTypes = this.listingService.getAllTypes().length;
  }

}
