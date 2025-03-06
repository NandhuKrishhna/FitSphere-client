import React from "react";
import { cloneDeep } from "lodash";
import { getSocket } from "@/lib/socketManager";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { Roles } from "@/utils/Enums";

interface PlayerState {
  [key: string]: {
    url: string | MediaStream;
    muted: boolean;
    playing: boolean;
  };
}

const usePlayer = (myId: string, roomId: string, peer: Peer | null) => {
  const socket = getSocket();
  const user = useSelector(selectCurrentUser);
  const [player, setPlayer] = React.useState<PlayerState>({});
  const navigate = useNavigate();

  // Get the currently highlighted player (my own video)
  const playerHighlight = player[myId] || null;

  // Get all other players (excluding myself)
  const nonHighlighted = Object.keys(player)
    .filter((key) => key !== myId)
    .reduce((acc, key) => {
      acc[key] = player[key];
      return acc;
    }, {} as PlayerState);

  const toggleAudio = () => {
    if (!player[myId]) return; // Ensure myId exists in the player state

    setPlayer((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return copy;
    });

    socket?.emit("user-toggle-audio", myId, roomId);
  };

  const toggleVideo = () => {
    if (!player[myId]) return; // Ensure myId exists in the player state

    setPlayer((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      return copy;
    });

    socket?.emit("user-toggle-video", myId, roomId);
  };

  const leaveRoom = () => {
    socket?.emit("user-leave", myId, roomId);
    console.log(`User ${myId} left room ${roomId}`);
    peer?.disconnect();

    // Redirect based on user role
    const navigateTo = user?.role === Roles.DOCTOR ? "/doctor/appointment-history" : "/appointment-history";
    navigate(navigateTo);
  };

  return { player, setPlayer, playerHighlight, nonHighlighted, toggleAudio, toggleVideo, leaveRoom };
};

export default usePlayer;
