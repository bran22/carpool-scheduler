import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent implements OnInit {

  @Input() ride: any;

  constructor() { }

  ngOnInit(): void {
  }

}
