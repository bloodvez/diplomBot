import {
  MenuTemplate,
  MenuMiddleware,
  createBackMainMenuButtons,
  deleteMenuFromContext,
} from "grammy-inline-menu";
import { Context } from "grammy";
import { getUser } from "./controllers/userController";
import { addExpToUser } from "./tlgMiddleware";
import { readFileSync } from "node:fs";

const memes: string[] = [];
try {
  JSON.parse(readFileSync("memes.json", "utf-8")).forEach((elem) => {
    memes.push(elem);
  });
} catch (error) {
  console.log("cant open memes", error);
}

const menuTemplate = new MenuTemplate<Context>(
  (ctx) => `Hey ${ctx.from.first_name}!`
);

menuTemplate.interact("Add 10 exp", "addExpButton", {
  do: async (ctx) => {
    const success = await addExpToUser(ctx.from.id, 10);
    if (!success) return ctx.answerCallbackQuery("Not registered");
    ctx.answerCallbackQuery("Exp added")
    return "..";
  },
});

menuTemplate.interact("Show Exp", "showExpButton", {
  joinLastRow: true,
  do: async (ctx) => {
    const { user } = await ctx.getAuthor();
    let userID = user.id;
    const DbUser = await getUser(userID);
    if (!DbUser) return ctx.answerCallbackQuery("Not registered");

    await ctx.answerCallbackQuery(`Current exp: ${DbUser.exp}`);
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

menuTemplate.interact("Send meme", "sendMessageButton", {
  do: async (ctx) => {
    let i = Math.floor(Math.random() * memes.length);
    const text = memes[i];
    ctx.reply(`${i}: ${text}`);
    return "..";
  },
});

const loginSubmenuMenu = new MenuTemplate<Context>(
  (ctx) => `${ctx.from.first_name}, let's log you in`
);

loginSubmenuMenu.interact("Login", "loginButton", {
  do: async (ctx) => {
    const { user } = await ctx.getAuthor();
    let userID = user.id;
    const DbUser = await getUser(userID);
    if (!DbUser) return ctx.answerCallbackQuery("Not registered");
    ctx.reply(
      `[Login Link](http://h.ladvez.net:5555/login?tk=${DbUser.refreshToken})`,
      { parse_mode: "MarkdownV2" }
    );
    return "..";
  },
});
loginSubmenuMenu.manualRow(createBackMainMenuButtons());

menuTemplate.submenu("Login", "unique", loginSubmenuMenu, {
  joinLastRow: true,
});

menuTemplate.url("Web GUI", "http://h.ladvez.net:5555", {
  joinLastRow: true,
});

menuTemplate.interact("Закрыть", "closeButton", {
  do: async (ctx) => {
    deleteMenuFromContext(ctx);
    return "..";
  },
});

export const menuMiddleware = new MenuMiddleware("/", menuTemplate);
