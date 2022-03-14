import { makeAutoObservable } from "mobx";

export interface ITrashState {
  volume: number;
  loading: boolean;
  setVolume(vol: number): void;
  setLoading(state: boolean): void;
}

export class TrashState implements ITrashState {
  volume: number;
  loading: boolean;

  constructor() {
    makeAutoObservable(this);
    this.loading = false;
    this.volume = 25;
  }

  setLoading(state: boolean): void {
      this.loading = state;
  }

  setVolume(vol: number): void {
    this.volume = vol;
  }
}
