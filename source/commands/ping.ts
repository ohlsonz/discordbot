import { SlashCommandBuilder, CommandInteraction, time } from "discord.js";
import client from "..";

const data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bots status")
    .setDescriptionLocalization("sv-SE", "Kontrollera bottens status");

const handler: Function = async (interaction: CommandInteraction): Promise<void> => {
    if (!client.application?.owner) {
        await client.application?.fetch();
    }

    await interaction.reply({
        content: `Pong! :ping_pong:\nOwner: ${client.application?.owner}\nCreated at: ${time(
            Math.ceil(client.user!.createdTimestamp / 1000),
            "F"
        )}`,
        ephemeral: true,
    });
};

export { data, handler };
