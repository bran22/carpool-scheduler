import { Component, OnInit, Input } from '@angular/core';
import { ICarpoolRide } from '../../interfaces/_index';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent implements OnInit {

  @Input() ride: ICarpoolRide;

  constructor() { }

  ngOnInit(): void {
  }

}
