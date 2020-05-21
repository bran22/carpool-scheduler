import { GeoJson } from './_index';
import { IUserIdAndName } from './user';

export interface ICarpool {
  carpoolId: string;
  carpoolName: string;
  destinationName: string;
  destinationPoint: GeoJson;
  meetupName: string;
  meetupPoint: GeoJson;
  meetupTime: string;
  meetupDays: Array<number>;
  owner: IUserIdAndName;
  participants: IUserIdAndName[];
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
  customDepartTime: {
    seconds: number;
    nanoseconds: number;
    toDate();
  };
  customMeetTime: {
    seconds: number;
    nanoseconds: number;
    toDate();
  };
  isCustomDepartTime: boolean;
  isCustomMeetTime: boolean;
  isDriver: boolean;
  isParticipating: boolean;
  oneWay: boolean;
  oneWayDirection: 'to-destination' | 'from-destination';
  userId: string;
}
