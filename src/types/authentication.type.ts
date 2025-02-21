type AuthRole = "user" | "doctor" | "admin";

export interface Auth_User {
  _id?: string;
  name?: string;
  email?: string;
  role?: AuthRole;
  profilePicture?: string;
  accessToken?: string;
}

export interface Auth_State {
  currentUser: Auth_User | null;
}
