
// data shape for 'users' collection
export interface AppUser {
  name: string;
  email: string;
  photoUrl: string;
  points: number;
}

// data shape for passing a userID as a array-includes query param for firebase queries
export interface IUserIdAndName {
  userId: string;
  name: string;
}

// data shape for carpools/{document}/participants
export interface CarpoolParticipant {
  id: string;
  name: string;
  owner: true;
}
