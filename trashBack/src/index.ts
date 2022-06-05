import TrashServer from "./trashServer";
import sequelize from "./db";
TrashServer.initBot()

// const trashServer = new TrashServer(IP_ADDRESS, PORT);

const startDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connection has been established successfully.');
    } catch (e) {
        console.log(e)
    }
}

startDB();
