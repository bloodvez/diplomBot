import express, { Application } from "express";
import { Context, Bot } from "grammy";
import {
  MenuTemplate,
  MenuMiddleware,
  deleteMenuFromContext,
} from "grammy-inline-menu";
import router from "./routes";
import { readFile } from "node:fs";
import { ITrashServer, IUserToken } from "./interfaces";
import dotenv from 'dotenv'
dotenv.config()

// const IP_ADDRESS = "localhost";
const IP_ADDRESS = process.env.HOST
const PORT = parseInt(process.env.PORT);

class TrashServer implements ITrashServer {
  expressApp: Application;
  tlgBot: Bot;
  tokensArr: IUserToken[];

  constructor(ip_address: string, port: number) {
    this.expressApp = express();

    // This thing allows us to use CORS
    this.expressApp.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });

    this.expressApp.use(express.static("build"));
    this.expressApp.use(express.json())
    this.expressApp.use("/api", router);

    this.expressApp.get("/", (req, res) => {
      res.send("hi");
      console.log("hi");
    });

    this.expressApp.listen(port, ip_address, () => {
      console.log(`listening on ${ip_address}:${port}`);
    });

    // Read the tokens file; temporary solution, change to postrges
    try {
      readFile("./tokens.json", "utf-8", (err, data) => {
        if (err) console.log("cannot open the file");
        this.tokensArr = Array.from(JSON.parse(data))        
      });
    } catch (error) {
      console.log(error);
    }
  }

  initBot() {
    this.tlgBot = new Bot(process.env.BOT_TOKEN);

    const menuTemplate = new MenuTemplate<Context>(
      (ctx) => `Hey ${ctx.from.first_name}!`
    );

    menuTemplate.interact("button1", "test1", {
      do: async (ctx) => {
        await ctx.reply("you pressed the button1");
        return "..";
      },
    });
    menuTemplate.interact("button2", "test2", {
      joinLastRow: true,
      do: async (ctx) => {
        await ctx.answerCallbackQuery("you pressed the button2");
        // this.tlgBot.api.sendMessage(266536855, 'message')
        return "..";
      },
    });
    menuTemplate.interact("Закрыть", "closeButton", {
      do: async (ctx) => {
        deleteMenuFromContext(ctx);
        return false;
      },
    });

    const menuMiddleware = new MenuMiddleware("/", menuTemplate);
    this.tlgBot.command("start", (ctx) => menuMiddleware.replyToContext(ctx));
    this.tlgBot.use(menuMiddleware);

    // Ignore all the other messages if the're not from private chat
    this.tlgBot.on("message:text", (ctx) => {
      if (ctx.message.chat.type !== "private") {
        return;
      }
      menuMiddleware.replyToContext(ctx);
    });

    // Adds menu button on the left of the chat box
    // Not sure if need to set commands every time; just in case
    this.tlgBot.api.setMyCommands([
      { command: "start", description: "Start the bot" },
    ]);
    this.tlgBot.start();
  }
}

export default new TrashServer(IP_ADDRESS, PORT);