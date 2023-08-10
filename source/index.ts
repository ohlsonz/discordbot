import { Client, GatewayIntentBits } from "discord.js";
import eventHandler from "./handlers/events";

import dotenv from "dotenv";
dotenv.config();

const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

export default client;

eventHandler();
