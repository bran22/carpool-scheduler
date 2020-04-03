import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ICarpool } from '../../interfaces/carpool';

@Component({
  selector: 'app-carpool-card',
  templateUrl: './carpool-card.component.html',
  styleUrls: ['./carpool-card.component.css']
})
export class CarpoolCardComponent implements OnInit, OnChanges {

  @Input() carpool: ICarpool;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.carpool);
  }

}
