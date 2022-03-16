import React from "react";
import { TrashContext } from "../../..";
import { trashVideo } from "../../../trashVideosManager";
import { QueueItemWrapper } from "./components";

type QueueProps = {
  video: trashVideo;
};

function QueueItem({ video }: QueueProps) {
  const trash = React.useContext(TrashContext);
  return (
    <QueueItemWrapper>
      {video.title}
      <button
        onClick={() => {
          trash?.videoManager.removeFromQueue(video);
        }}
      >
        remove
      </button>
    </QueueItemWrapper>
  );
}

export default QueueItem;
