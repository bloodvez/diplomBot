import { $authHost} from ".";
// import { $authHost, $host } from ".";
import {
  IUserResponses,
  UserResponseError,
  UserResponseSuccess,
} from "./interfaces";

export async function authorisedRequest(): Promise<IUserResponses> {
  try {
    const resp = await $authHost.get("api/user");
    const result: UserResponseSuccess = {
      type: "SUCCESS",
      text: resp.data.text,
    };
    return result;
  } catch (err) {
    const result: UserResponseError = {
      type: "ERROR",
    };
    return result;
  }
}
