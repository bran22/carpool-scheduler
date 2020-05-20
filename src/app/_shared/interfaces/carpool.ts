import { ICarpoolParticipant, GeoJson } from './_index';

export interface ICarpool {
  carpoolId: string;
  carpoolName: string;
  destinationName: string;
  destinationPoint: GeoJson;
  meetupName: string;
  meetupPoint: GeoJson;
  meetupTime: string;
  meetupDays: Array<number>;
  owner: any;
  participants: ICarpoolParticipant[];
}
