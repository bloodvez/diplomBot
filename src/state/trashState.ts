import { makeAutoObservable } from "mobx";
import { fetchCurrentUserData, fetchProfilePicture } from "../http/methods";
import { IUserRole, IUserState, ITrashState } from "./interfaces";

export class TrashStore implements ITrashState {
  loading: boolean = false;
  userState: IUserState = "LOADING";
  tlgId: string = "";
  exp: number = 0;
  profilePictureBlob: string = "./img/logo.jpg";
  role: IUserRole = "USER";
  createdAt: Date | null = null;
  name: string = "";

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    const currentUserData = await fetchCurrentUserData();
    if (!currentUserData) {
      this.setUserState("ERROR");
      return;
    }

    this.setText(currentUserData.id);
    this.setExp(currentUserData.exp);
    this.setName(currentUserData.name);
    this.setRole(currentUserData.role);
    this.setCreatedAt(new Date(currentUserData.createdAt));
    this.setUserState("NORMAL_RESPONSE");

    const pfpBlob = await fetchProfilePicture();
    if (!pfpBlob) return;
    this.setProfilePictureBlob(pfpBlob);
  }

  setLoading(state: boolean): void {
    this.loading = state;
  }

  setUserState(state: IUserState): void {
    this.userState = state;
  }

  setText(text: string) {
    this.tlgId = text;
  }

  setProfilePictureBlob(blobText: string) {
    this.profilePictureBlob = blobText;
  }

  setExp(amount: number) {
    this.exp = amount;
  }

  setRole(role: IUserRole) {
    this.role = role;
  }

  setName(name: string) {
    this.name = name;
  }

  setCreatedAt(date: Date) {
    this.createdAt = date;
  }
}
