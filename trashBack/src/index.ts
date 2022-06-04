import TrashServer from "./trashServer";
import sequelize from "./db";
TrashServer.initBot()

// const trashServer = new TrashServer(IP_ADDRESS, PORT);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log(e)
    }
}

start();
