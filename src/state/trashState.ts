import { makeAutoObservable } from "mobx";
import { authorisedRequest } from "../http/authorisedRequest";

type IUserState = "LOADING" | "NORMAL_RESPONSE" | "ERROR";

export interface ITrashState {
  loading: boolean;
  userState: IUserState;
  text: string;
  setText(text: string): void;
  setLoading(state: boolean): void;
  fetchUserData(): void;
}

export class TrashStore implements ITrashState {
  loading: boolean;
  userState: IUserState;
  text: string;

  constructor() {
    this.loading = false;
    this.userState = "LOADING";
    this.text = "";
    makeAutoObservable(this);
  }

  setLoading(state: boolean): void {
    this.loading = state;
  }

  setUserState(state: IUserState): void {
    this.userState = state;
  }

  setText(text: string) {
    this.text = text;
  }

  async fetchUserData() {
    const res = await authorisedRequest();
    if (res.type !== 'ERROR'){
        this.setUserState('NORMAL_RESPONSE');
        this.setText(res.text);
    } else {
        this.setUserState('ERROR');
    }
  }
}
