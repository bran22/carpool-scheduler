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
  carpoolName: string;
  confirmedParticipants: [];
  potentialParticipants: [];
  rideDate: {
    seconds: number;
    nanoseconds: number;
    toDate(); // somehow, a built-in function to the timestamp data type pulled from firebase?!
  };
  ridePreferences?: ICarpoolPreference[];
  rideId: string;
}

export interface ICarpoolPreference {
  customDepartTime: string;
  customMeetTime: string;
  isCustomDepartTime: boolean;
  isCustomMeetTime: boolean;
  isDriver: boolean;
  isParticipating: boolean;
  oneWay: boolean;
  userId: string;
}
