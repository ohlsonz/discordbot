import { readdirSync } from "fs";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { Command } from "../context";
import client from "..";

const commandHandler: Function = async (): Promise<void> => {
    const commandFiles: string[] = readdirSync("./source/commands", {
        encoding: "utf-8",
    }).filter((file: string): boolean => file.endsWith(".ts"));

    if (!commandFiles || commandFiles.length <= 0) throw new Error("No commands found");

    const commandData = commandFiles.map(
        async (commandFile: string): Promise<RESTPostAPIChatInputApplicationCommandsJSONBody> => {
            const commandName: string = commandFile.replace(".ts", "").toLowerCase().trim();
            const command: Command = await import(`../commands/${commandName}`);

            return command.data.toJSON();
        }
    );

    const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = await Promise.all(
        commandData
    );

    if (commands && commands.length > 0) {
        await client.application?.commands.set(commands);

        console.log(
            `Loaded a total of ${commands.length} ${
                commands.length == 1 ? "command" : "commands"
            }\n${commands.length == 1 ? "Command" : "Commands"} loaded: [${commands
                .map((command) => command.name)
                .join(", ")}]`
        );
    }
};

export default commandHandler;
