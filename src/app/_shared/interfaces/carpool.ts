import { GeoJson } from './map';
import { CollectionReference } from '@angular/fire/firestore';

export interface ICarpool {
  carpoolId: string;
  carpoolName: string;
  destinationName: string;
  destinationPoint: GeoJson;
  meetupName: string;
  meetupPoint: GeoJson;
  meetupTime: string;
  meetupDays: Array<number>;
  participants: Array<CollectionReference>;
}
