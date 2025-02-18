export type Messages = {
  createdAt: string;
  isRead: false;
  message: string;
  receivedId: string;
  senderId: string;
  _id: string;
};
export type IsLoading = {
  isLoading: boolean;
};

export type ChatMessageData = {
  message: string;
  messages: Messages[];
  success: boolean;
};

export type SelectedUser = {
  doctorDetails: {
    name: string;
    profilePicture: string;
    _id: string;
  };
  lastMessage: string;
  _id: string;
};

export type Users = {
  doctorDetails: {
    name: string;
    profilePicture: string;
    _id: string;
  } | null;
  lastMessage: string;
  _id: string;
};
