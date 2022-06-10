import { pingPayload, sendMessagePayload } from "./interfaces";
import trashServer from "./trashServer";

export function pingAction(payload: pingPayload) {
  console.log("ping", payload.text);
}

export async function sendMessageAction(payload: sendMessagePayload):Promise<boolean>{
  const { text, tlgID } = payload;
  try {
    await trashServer.tlgBot.api.sendMessage(tlgID, text)
    return true
  } catch (error) {
    return false
  }
    
//   console.log("send message", payload.text, payload.tlgID);
}
