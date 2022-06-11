import { Api, BotError, Context } from "grammy";
import { getListOfUsersIDS, getUser } from "./controllers/userController";
import { User } from "./models/models";
import { menuMiddleware } from "./tlgInlineMenus";
import { generateRefreshToken } from "./utils";

export async function registerNewUser(ctx: Context) {
  const { user } = await ctx.getAuthor();
  let userTlgID = user.id;
  const DbUser = await getUser(userTlgID);
  if (DbUser) return;
  const refreshToken = generateRefreshToken({ tlgID: userTlgID, role: "USER" });
  await User.create({
    tlgID: userTlgID,
    refreshToken: refreshToken,
    name: ctx.from.first_name,
  });
  return false;
}

export async function getProfilePictureURL(
  userID: number,
  api: Api
): Promise<string | null> {
  const chat = await api.getChat(userID);
  if (!chat.photo) return null;

  const file = await api.getFile(chat.photo.big_file_id);
  return file.file_path;
}

export async function increaseLevel(userID: number): Promise<boolean | number> {
  const foundUser = await getUser(userID);
  if (!foundUser) return false;

  const currentExp = foundUser.exp;
  const currentLevel = foundUser.level;
  const neededExp = Math.floor(100 * Math.pow(currentLevel, 1.3));

  if (currentExp >= neededExp) {
    const leftoverExp = currentExp - neededExp;
    foundUser.update({ exp: leftoverExp, level: currentLevel + 1 });
    return true;
  }
  return neededExp - currentExp;
}

export function errorHandler(ctx: BotError) {
  console.log("error in grammy:", ctx);
}

export function onTextMiddleware(ctx: Context) {
  // Ignore all the other messages if the're not from private chat
  if (ctx.message.chat.type === "private") menuMiddleware.replyToContext(ctx);
}

export async function sendMessageToUsers(text: string, ctx: Context) {
  const list = await getListOfUsersIDS();
  list.forEach((elem) => {
    ctx.api.sendMessage(elem, text).catch((err) => {
      console.log("error when sending message", err.error_code);
    });
  });
}
