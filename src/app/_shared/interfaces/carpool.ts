import { GeoJson } from './map';

export interface ICarpool {
  daysOfWeek: string;
  destination: GeoJson;
  origin: GeoJson;
  meetTime: string;
  name: string;

}
