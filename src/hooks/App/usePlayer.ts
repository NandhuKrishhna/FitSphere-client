import React from "react";
import { cloneDeep } from "lodash";
import { getSocket } from "@/lib/socketManager";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { Roles } from "@/utils/Enums";
import useLeaveMeeting from "./useLeaveMeeting";
import { selectedMeetingId } from "@/redux/slice/appFeatSlice";

interface PlayerState {
  [key: string]: {
    url: string | MediaStream;
    muted: boolean;
    playing: boolean;
  };
}

const usePlayer = (myId: string, roomId: string, peer: Peer | null) => {
  const meetingId = useSelector(selectedMeetingId)
  const {handleLeaveMeeting} = useLeaveMeeting()
  const socket = getSocket();
  const user = useSelector(selectCurrentUser);
  const [player, setPlayer] = React.useState<PlayerState>({});
  const navigate = useNavigate();

  const playerHighlight = player[myId] || null;

  const nonHighlighted = Object.keys(player)
    .filter((key) => key !== myId)
    .reduce((acc, key) => {
      acc[key] = player[key];
      return acc;
    }, {} as PlayerState);

    const onLeaveMeeting = () => {
      handleLeaveMeeting(meetingId!)
    }

  const toggleAudio = () => {
    if (!player[myId]) return; 

    setPlayer((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return copy;
    });

    socket?.emit("user-toggle-audio", myId, roomId);
  };

  const toggleVideo = () => {
    if (!player[myId]) return; 

    setPlayer((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      return copy;
    });

    socket?.emit("user-toggle-video", myId, roomId);
  };

  const leaveRoom = async() => {
    if (player[myId]?.url instanceof MediaStream) {
      player[myId].url.getTracks().forEach(track => track.stop());
    }
    
    socket?.emit("user-leave", myId, roomId);
    console.log(`User ${myId} left room ${roomId}`);
  
    peer?.disconnect(); 
  
    setPlayer((prev) => {
      const copy = cloneDeep(prev);
      delete copy[myId]; 
      return copy;
    });
    if (meetingId) {
      await onLeaveMeeting(); 
    }
    const navigateTo = user?.role === Roles.DOCTOR ? "/doctor/appointments" : "/appointments";
    navigate(navigateTo);
  };
  

  return { player, setPlayer, playerHighlight, nonHighlighted, toggleAudio, toggleVideo, leaveRoom };
};

export default usePlayer;
