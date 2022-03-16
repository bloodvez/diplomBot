import { makeAutoObservable } from "mobx";

export type trashVideo = {
  title: string;
  id: string;
};

export interface ITrashVideosManager {
  currentTime: number;
  currentVideo: trashVideo | null;
  videoQueue: trashVideo[];
  addToQueue(video: trashVideo): void;
  removeFromQueue(video: trashVideo): void;
  setCurrentTime(val: number): void;
  stop(): void;
  play(): void;
  skip(): void;
}

export default class TrashVideosManager implements ITrashVideosManager {
  currentTime: number;
  currentVideo: trashVideo | null;
  videoQueue: trashVideo[];

  constructor() {
    makeAutoObservable(this);
    this.currentTime = 0;
    this.currentVideo = null;
    this.videoQueue = [];
    this.addToQueue({ title: "title", id: "123" });
  }

  addToQueue(video: trashVideo) {
    this.videoQueue.push(video);
  }

  removeFromQueue(video: trashVideo) {
    const idx = this.videoQueue.indexOf(video);
    if (idx !== -1) {
      this.videoQueue.splice(idx, 1);
    }
  }

  setCurrentTime(val: number) {
    this.currentTime = val;
  }

  stop(): void {
    console.log("stop");
  }

  play(): void {
    console.log("play");
  }

  skip(): void {
    console.log("skip");
  }
}
