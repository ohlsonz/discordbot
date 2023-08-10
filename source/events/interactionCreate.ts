import { Interaction, InteractionType, Events } from "discord.js";
import { Command, Modal, Button } from "../context";

const name: string = Events.InteractionCreate;

const handler: Function = async (interaction: Interaction): Promise<void> => {
    if (interaction.type === InteractionType.ApplicationCommand) {
        const commandName: string = interaction.commandName.toLowerCase().trim();

        const command: Command = await import(`../commands/${commandName}`);

        command.handler(interaction);
    }

    if (interaction.type === InteractionType.MessageComponent && interaction.isButton()) {
        const buttonName: string = interaction.customId.toLowerCase().trim();

        const button: Button = await import(`../buttons/${buttonName}`);

        button.default(interaction);
    }

    if (interaction.type === InteractionType.ModalSubmit) {
        const modalName = interaction.customId.toLowerCase().trim();

        const modal: Modal = await import(`../modals/${modalName}`);

        modal.default(interaction);
    }
};

export { name, handler };
