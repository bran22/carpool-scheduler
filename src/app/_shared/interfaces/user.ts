
// data shape for 'users' collection
export interface IAppUser {
  name: string;
  email: string;
  photoUrl: string;
  points: number;
}

// data shape for passing a userID as a array-includes query param for firebase queries
// also used for carpools/{document}/participants
export interface IUserIdAndName {
  userId: string;
  name: string;
}
