import { Events } from "discord.js";
import commandHandler from "../handlers/commands";
import client from "..";

const name: string = Events.ClientReady;
const handler: Function = async (): Promise<void> => {
    console.log(`Authorized as ${client.user?.username} (${client.user?.id})`);

    client.user?.setStatus("dnd");

    await commandHandler();
};

export { name, handler };
