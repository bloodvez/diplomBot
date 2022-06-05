import { BotError, Context } from "grammy";
import {
  MenuTemplate,
  MenuMiddleware,
  deleteMenuFromContext,
} from "grammy-inline-menu";
import { addExpToUser, getUser } from "./controllers/userController";
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
menuTemplate.interact("Закрыть", "closeButton", {
  do: closeMenu,
});

async function closeMenu(ctx: Context) {
  deleteMenuFromContext(ctx);
  return false;
}

export function errorHandler(ctx: BotError) {
  console.log("error in grammy:", ctx);
}

// Ignore all the other messages if the're not from private chat
export function onTextMiddleware(ctx: Context) {
  if (ctx.message.chat.type !== "private") return;

  menuMiddleware.replyToContext(ctx);
}

export const menuMiddleware = new MenuMiddleware("/", menuTemplate);
