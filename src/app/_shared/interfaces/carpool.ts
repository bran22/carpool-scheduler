import { CarpoolParticipant, GeoJson } from './_index';

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
  participants: any;
}

export interface ICarpoolRide {
  carpoolId: string;
  potentialParticipants: string[];
  rideDate: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface ICarpoolPreference {
  userId: string;
  departTime: string;
  isDriver: boolean;
  isParticipating: boolean;
  meetTime: string;
  oneWay: string;
}
