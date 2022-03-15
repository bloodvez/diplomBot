import { makeAutoObservable } from "mobx";

export interface ITrashState {
  volume: number;
  loading: boolean;
  currentTime: number;
  setVolume(vol: number): void;
  setLoading(state: boolean): void;
  stop():void;
  play():void;
  skip():void;
}

export class TrashState implements ITrashState {
  volume: number;
  loading: boolean;
  currentTime: number;

  constructor() {
    makeAutoObservable(this);
    this.loading = false;
    this.volume = 25;
    this.currentTime = 36;
  }

  setCurrentTime(val: number){
    this.currentTime = val;
  }

  setLoading(state: boolean): void {
      this.loading = state;
  }

  setVolume(vol: number): void {
    this.volume = vol;
  }

  stop():void{
    console.log("stop");
  }

  play():void{
    console.log("play");
  }

  skip():void{
    console.log("skip");
  }
}
