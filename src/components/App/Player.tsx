import ReactPlayer from "react-player";
import { User } from "lucide-react";
import { Props } from "@/types/types";


const Player = (props: Props) => {
  const { url, muted, playing, width = "100%", height = "100%", showUserIcon = false } = props;

  return (
    <div className="relative w-full h-full">
      {showUserIcon ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <div className="bg-gray-500 rounded-full p-6">
            <User size={48} className="text-gray-300" />
          </div>
        </div>
      ) : (
        <ReactPlayer url={url} muted={muted} playing={playing} width={width} height={height} className="object-cover" />
      )}
    </div>
  );
};

export default Player;
