import ReactPlayer from "react-player";
import { SourceProps } from "react-player/base";
type Props = {
  url: string | MediaStream | string[] | SourceProps[] | undefined;
  muted: boolean;
  playing: boolean;
};
const Player = (props: Props) => {
  const { url, muted, playing } = props;
  return (
    <div>
      <ReactPlayer url={url} muted={muted} playing={playing} />
    </div>
  );
};
export default Player;
