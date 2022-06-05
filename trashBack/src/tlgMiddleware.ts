import { BotError, Context } from "grammy";
import {
  MenuTemplate,
  MenuMiddleware,
  deleteMenuFromContext,
} from "grammy-inline-menu";
import {
  addExpToUser,
  getListOfUsers,
  getUser,
} from "./controllers/userController";
import { User } from "./models/models";
import { generateRefreshToken } from "./utils";
// import { getUser } from "./controllers/userController";

const menuTemplate = new MenuTemplate<Context>(
  (ctx) => `Hey ${ctx.from.first_name}!`
);

menuTemplate.interact("Add 10 exp", "test1", {
  do: async (ctx) => {
    const { user } = await ctx.getAuthor();
    let userID = user.id;
    addExpToUser(userID, 10);
    // const dbUser = await getUser(userID);
    // console.log(dbUser.id);
    return "..";
  },
});
menuTemplate.interact("Roll 0-1000", "rollButton", {
  joinLastRow: true,
  do: async (ctx) => {
    const randomRoll = Math.floor(Math.random() * 1000);
    await ctx.answerCallbackQuery(`you rolled ${randomRoll}`);
    return "..";
  },
});
menuTemplate.interact("Show Exp", "showExpButton", {
  joinLastRow: true,
  do: async (ctx) => {
    const { user } = await ctx.getAuthor();
    let userID = user.id;
    const DbUser = await getUser(userID);
    await ctx.answerCallbackQuery(`Current exp: ${DbUser.exp}`);
    return "..";
  },
});
menuTemplate.interact("Send Message", "sendMessageButton", {
  joinLastRow: true,
  do: async (ctx) => {
    sendMessageToUsers(ctx);
    return "..";
  },
});
menuTemplate.interact("Закрыть", "closeButton", {
  do: closeMenu,
});

async function closeMenu(ctx: Context) {
  deleteMenuFromContext(ctx);
  return false;
}

export async function registerNewUser(ctx: Context) {
  const { user } = await ctx.getAuthor();
  let userTlgID = user.id;
  const DbUser = await getUser(userTlgID);
  if (DbUser) return;
  const refreshToken = generateRefreshToken({ tlgID: userTlgID });
  await User.create({ tlgID: userTlgID, refreshToken: refreshToken });
  return false;
}

export function errorHandler(ctx: BotError) {
  console.log("error in grammy:", ctx);
}

export function onTextMiddleware(ctx: Context) {
  // Ignore all the other messages if the're not from private chat
  if (ctx.message.chat.type === "private") menuMiddleware.replyToContext(ctx);
}

export async function sendMessageToUsers(ctx: Context) {
  const list = await getListOfUsers();
  list.forEach(elem =>{
      ctx.api.sendMessage(elem, 'Hi')
  })
}

export const menuMiddleware = new MenuMiddleware("/", menuTemplate);
