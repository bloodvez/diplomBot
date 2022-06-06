import { Api, BotError, Context } from "grammy";
import { getListOfUsers, getUser } from "./controllers/userController";
import { User } from "./models/models";
import { menuMiddleware } from "./tlgInlineMenus";
import { generateRefreshToken } from "./utils";

export async function registerNewUser(ctx: Context) {
  const { user } = await ctx.getAuthor();
  let userTlgID = user.id;
  const DbUser = await getUser(userTlgID);
  if (DbUser) return;
  const refreshToken = generateRefreshToken({ tlgID: userTlgID });
  await User.create({ tlgID: userTlgID, refreshToken: refreshToken, name: ctx.from.first_name });
  return false;
}

export async function getProfilePictureURL(
  userID: number,
  api: Api
): Promise<string | null> {
  const chat = await api.getChat(userID);
  if (!chat.photo) return null;

  const file = await api.getFile(chat.photo.big_file_id);
  return file.file_path
}

export async function addExpToUser(
  userID: number,
  amount: number
): Promise<boolean> {
  const foundUser = await getUser(userID);
  if (!foundUser) return false;
  foundUser.increment("exp", { by: amount });
  return true;
}

export function errorHandler(ctx: BotError) {
  console.log("error in grammy:", ctx);
}

export function onTextMiddleware(ctx: Context) {
  // Ignore all the other messages if the're not from private chat
  if (ctx.message.chat.type === "private") menuMiddleware.replyToContext(ctx);
}

export async function sendMessageToUsers(text: string, ctx: Context) {
  const list = await getListOfUsers();
  list.forEach((elem) => {
    ctx.api.sendMessage(elem, text).catch((err) => {
      console.log("error when sending message", err.error_code);
    });
  });
}
