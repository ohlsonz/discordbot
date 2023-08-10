import { readdirSync } from "fs";
import client from "..";
import { Event } from "../context";

const eventHandler: Function = async (): Promise<void> => {
    const eventFiles: string[] = readdirSync("./source/events", {
        encoding: "utf-8",
    }).filter((file: string): boolean => file.endsWith(".ts"));

    eventFiles.forEach(async (eventFile: string): Promise<void> => {
        const event: Event = await import(`../events/${eventFile}`);

        if (!event.name || !event.handler) throw new Error("Event is not defined");

        client.on(event.name, event.handler);
    });

    client.login(process.env.token);
};

export default eventHandler;
