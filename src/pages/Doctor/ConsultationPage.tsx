import Player from "@/components/App/Player";
import useMediaStream from "@/hooks/App/useMediaStream";
import { getSocket } from "@/lib/socketManager";
import usePeer from "@/services/peer";
import React, { useEffect } from "react";
import usePlayer from "@/hooks/App/usePlayer";

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
  console.log(socket);
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { player, setPlayer, playerHighlight, nonHighlighted } = usePlayer(myId as string);

  //handleUserconnection;;

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

  return (
    <div>
      {Object.keys(player).map((playerId) => {
        const { url, muted, playing } = player[playerId];
        return <Player key={playerId} url={url} muted={muted} playing={playing} />;
      })}
    </div>
  );
};

export default ConsultationPage;
