import Player from "@/components/App/Player";
import useMediaStream from "@/hooks/App/useMediaStream";
import { getSocket } from "@/lib/socketManager";
import usePeer from "@/services/peer";
import React, { useEffect } from "react";
import usePlayer from "@/hooks/App/usePlayer";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import type Peer from "peerjs";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

interface PlayerObject {
  [key: string]: {
    url: string | MediaStream;
    muted: boolean;
    playing: boolean;
  };
}

const ConsultationPage: React.FC = () => {
  const socket = getSocket();
  usePeer();
  const roomId = useParams().meetId;
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { player, setPlayer, playerHighlight, nonHighlighted, toggleAudio, toggleVideo, leaveRoom } = usePlayer(
    myId as string,
    roomId as string,
    peer as Peer | null
  );
  const [users, setUsers] = React.useState<string[]>([]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: string) => {
      console.log(`User ${newUser} connected`);
      if (stream) {
        const call = peer?.call(newUser, stream);
        call.on("stream", (incomingStream) => {
          console.log(`Incoming call from ${newUser}`);
          setPlayer((prev: PlayerObject) => ({
            ...prev,
            [newUser]: {
              url: incomingStream,
              muted: false,
              playing: true,
            },
          }));
          setUsers((prev) => ({
            ...prev,
            [newUser]: call,
          }));
        });
      } else {
        console.error("Media stream is not available");
      }
    };

    socket?.on("user-connected", handleUserConnected);

    return () => {
      socket?.off("user-connected", handleUserConnected);
    };
  }, [peer, stream, socket, setPlayer]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: calledId } = call;
      call.answer(stream);

      call.on("stream", (userVideoStream) => {
        console.log(`Incoming call from ${calledId}`);
        setPlayer((prev: PlayerObject) => ({
          ...prev,
          [calledId]: {
            url: userVideoStream,
            muted: false,
            playing: true,
          },
        }));
      });
      setUsers((prev) => ({
        ...prev,
        [calledId]: call,
      }));
    });
  }, [peer, stream, setPlayer]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayer((prev: PlayerObject) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [myId, setPlayer, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId: string) => {
      console.log(`Toggling audio for user ${userId}`);
      setPlayer((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };
    const handleToggleVideo = (userId: string) => {
      console.log(`Toggling audio for user ${userId}`);
      setPlayer((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId: string) => {
      console.log(`User ${userId} left the room`);
      users[userId]?.close();
      const playersCopy = cloneDeep(player);
      delete playersCopy[userId];
      setPlayer(playersCopy);
    };
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [player, setPlayer, socket, users]);

  const myPlayerState = myId ? player[myId] : null;
  const isMyAudioMuted = myPlayerState?.muted || false;
  const isMyVideoOff = myPlayerState ? !myPlayerState.playing : false;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 relative overflow-hidden p-4">
        {Object.keys(nonHighlighted).length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex gap-2 max-w-[30%]">
            {Object.keys(nonHighlighted).map((playerId) => {
              const { url, muted, playing } = player[playerId];
              return (
                <div key={playerId} className="w-40 h-24 rounded-lg overflow-hidden shadow-lg">
                  <Player
                    url={url}
                    muted={muted}
                    playing={playing}
                    width="100%"
                    height="100%"
                    showUserIcon={!playing}
                  />
                  {muted && (
                    <div className="absolute bottom-1 left-1 bg-red-500 rounded-full p-1">
                      <MicOff size={12} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {playerHighlight && (
          <div className="w-full h-full rounded-xl overflow-hidden">
            <Player
              url={playerHighlight.url}
              muted={playerHighlight.muted}
              playing={playerHighlight.playing}
              showUserIcon={!playerHighlight.playing}
            />
          </div>
        )}
      </div>

      <div className="h-20 bg-gray-800 flex items-center justify-center">
        <div className="flex gap-4">
          <button
            onClick={() => toggleAudio()}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMyAudioMuted ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isMyAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={() => toggleVideo()}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMyVideoOff ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isMyVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>

          <button
            onClick={() => leaveRoom()}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
