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
  _id?: string;
  updatedAt?: string;
};

export type Users = {
  doctorDetails: {
    name?: string;
    profilePicture?: string;
    _id?: string;
  }
  lastMessage?: string;
};
export type SidebarUsers = {
  users: Users[]
}

export type MessagesData = {
  createdAt: string;
  isRead: boolean;
  message: string;
  image?: string;
  receivedId: string;
  senderId: string;
  _id: string;
};

export type ConversationResponse = {
  _id: string;
  participants: [string, string];
  lastMessage?: string;
  updatedAt: string;
  createdAt: string
}

export type ConversationApiResponse = {
  message: string;
  success: boolean;
  conversation: ConversationResponse | null
}