const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tobinary')
        .setDescription('Converts a UTF-8 string to binary.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to convert to binary')
                .setRequired(true)),
    async execute(interaction) {
        // Retrieving the text input from the user
        const text = interaction.options.getString('text');

        // Convert the text to binary
        const binary = text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');

        // Reply with the binary string
        await interaction.reply(`Text: ${text}\nBinary: ${binary}`);
    },
};
