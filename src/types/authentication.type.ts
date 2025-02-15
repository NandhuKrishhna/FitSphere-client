type AuthRole = "user" | "doctor" | "admin";

export interface Auth_User {
  _id?: string;
  name? : string;
  email? : string
  accessToken?: string;
  role?: AuthRole;
  profilePicture?: string;
}

export interface Auth_State {
  currentUser: Auth_User | null;
}