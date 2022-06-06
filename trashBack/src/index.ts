import TrashServer from "./trashServer";

// const trashServer = TrashServer
import sequelize from "./db";
TrashServer.initBot()

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
