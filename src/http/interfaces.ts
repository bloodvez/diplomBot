export interface UserResponseSuccess {
  type: "SUCCESS";
  text: string;
}
export interface UserResponseError {
  type: "ERROR";
}

export type IUserResponses = UserResponseSuccess | UserResponseError;
