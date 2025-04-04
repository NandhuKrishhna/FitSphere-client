export interface IMessage {
    conversationId: string;
    createdAt: string;
    isRead: boolean;
    message?: string;
    image?: string
    receiverId: string;
    senderId: string;
    _id: string
}
export interface INewMessageResponse {
    success: boolean
    message: string;
    newMessage: IMessage
}

export interface IGetMessagesResponse {
    conversationId: string;
    messages: IMessage[]
}

export interface ISendMessageParams {
    receiverId: string;
    message?: string;
    image?: string
}


export interface IGetUsersForSidebarResponse {
    success: boolean;
    message: string;
    users: ISidebarUsers[];
}
export interface ISidebarUsers {
    _id: string;
    doctorDetails: {
        _id: string;
        name: string;
        profilePicture: string;
    };
    lastMessage?: string;
}

export interface ICreateConversationResponse {
    success: boolean;
    message: string;
    response: ISidebarUsers
}


// {"success":true,
//     "message":"Users fetched successfully",
//     "users":[
//         {
//             "_id":"67ec728d623b3171babba2a2",
//             "doctorDetails":
//             {
//                 "_id":"67a8be401520a9d7983ef076",
//                 "name":"Dr. Liam Smith",
//                 "profilePicture":"https://res.cloudinary.com/dzsdfw5vx/image/upload/v1739163979/pngtree-male-doctor-photo-png-image_11755264_kupowv.png"
//             },
//             "lastMessage":"fg"
//         }
//     ]
// }