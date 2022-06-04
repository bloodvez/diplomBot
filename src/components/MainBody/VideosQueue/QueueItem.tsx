import React from "react";
import { trashVideo } from "../../../trashVideosManager";
// import { TrashContext } from "../../..";
// import { QueueItemWrapper } from "./components";

type QueueProps = {
  video: trashVideo;
};

function QueueItem({ video }: QueueProps) {
  // const trash = React.useContext(TrashContext);
  return (
    // <QueueItemWrapper>
    //   {video.title}
    //   <button
    //     onClick={() => {
    //       trash?.videoManager.removeFromQueue(video);
    //     }}
    //   >
    //     remove
    //   </button>
    // </QueueItemWrapper>
    <></>
  );
}

export default QueueItem;
