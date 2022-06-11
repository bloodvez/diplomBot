import {
  MenuTemplate,
  MenuMiddleware,
  createBackMainMenuButtons,
  deleteMenuFromContext,
} from "grammy-inline-menu";
import { Context } from "grammy";
import { getUser } from "./controllers/userController";
import { increaseLevel } from "./tlgMiddleware";
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
  (ctx) => `${ctx.from.first_name}, Добро пожаловать в мою дипломную работу.`
);

menuTemplate.interact("Поменять опыт на уровень", "lvlExchangeButton", {
  do: async (ctx) => {
    const result:boolean | number = await increaseLevel(ctx.from.id);
    if (!result) return ctx.answerCallbackQuery("Вы не зарегестрированы");
    if (typeof result === 'number') {
      ctx.answerCallbackQuery(`Недостаточно ${result} опыта`)
      return ".."
    }
    ctx.answerCallbackQuery("Добавлен 1 уровень")
    return "..";
  },
});

menuTemplate.interact("Показать опыт", "showExpButton", {
  joinLastRow: true,
  do: async (ctx) => {
    const { user } = await ctx.getAuthor();
    let userID = user.id;
    const DbUser = await getUser(userID);
    if (!DbUser) return ctx.answerCallbackQuery("Вы не зарегестрированы");

    await ctx.answerCallbackQuery(`Текущий опыт: ${DbUser.exp}`);
    return "..";
  },
});

menuTemplate.interact("Кинуть кубик", "rollButton", {
  joinLastRow: true,
  do: async (ctx) => {
    const randomRoll = Math.floor(Math.random() * 6);
    await ctx.answerCallbackQuery(`Выпало ${randomRoll}`);
    return "..";
  },
});

menuTemplate.interact("Отправить рецепт", "sendMessageButton", {
  do: async (ctx) => {
    let i = Math.floor(Math.random() * memes.length);
    const text = memes[i];
    ctx.reply(`${i}: ${text}`, {parse_mode:'MarkdownV2'});
    return "..";
  },
});

const loginSubmenuMenu = new MenuTemplate<Context>(
  (ctx) => `${ctx.from.first_name}, Здесь можно получить ссылку для логина`
);

loginSubmenuMenu.interact("Полчить ссылку", "loginButton", {
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

menuTemplate.submenu("Логин", "unique", loginSubmenuMenu, {
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
