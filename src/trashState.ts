import { makeAutoObservable } from "mobx";
import TrashVideosManager from "./trashVideosManager";

export interface ITrashState {
  volume: number;
  loading: boolean;
  videoManager:TrashVideosManager;
  setVolume(vol: number): void;
  setLoading(state: boolean): void;
}

export class TrashState implements ITrashState {
  volume: number;
  loading: boolean;
  videoManager: TrashVideosManager;

  constructor() {
    makeAutoObservable(this);
    this.loading = false;
    this.volume = 25;
    this.videoManager = new TrashVideosManager()
  }

  setLoading(state: boolean): void {
    this.loading = state;
  }

  setVolume(vol: number): void {
    this.volume = vol;
  }
}
