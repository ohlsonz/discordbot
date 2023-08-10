import {
    ClientEvents,
    SlashCommandBuilder,
    CommandInteraction,
    ChatInputCommandInteraction,
    ButtonInteraction,
    ModalSubmitInteraction,
} from "discord.js";

export interface Event {
    name: keyof ClientEvents;
    handler: (...args: any) => Promise<void>;
}

export interface Modal {
    default: (interaction: ModalSubmitInteraction) => Promise<void>;
}

export interface Button {
    default: (interaction: ButtonInteraction) => Promise<void>;
}

export interface Command {
    data: SlashCommandBuilder;
    handler: (interaction: CommandInteraction | ChatInputCommandInteraction) => Promise<void>;
}
