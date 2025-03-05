import { useState } from "react";
import { cloneDeep } from "lodash";
interface PlayerState {
  [key: string]: {
    url: string | MediaStream;
    muted: boolean;
    playing: boolean;
  };
}

const usePlayer = (myId: string) => {
  const [player, setPlayer] = useState<PlayerState>({});
  const playersCopy = cloneDeep(player);

  const playerHighlight = playersCopy[myId];
  const nonHighlighted = playersCopy;
  return { player, setPlayer, playerHighlight, nonHighlighted };
};

export default usePlayer;
