const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frombinary')
        .setDescription('Converts a binary string back to UTF-8.')
        .addStringOption(option =>
            option.setName('binary')
                .setDescription('The binary string to convert to UTF-8')
                .setRequired(true)),
    async execute(interaction) {
        // Retrieving the binary input from the user
        const binary = interaction.options.getString('binary');

        // Convert the binary string to UTF-8
        const text = binary.split(' ').map(bin => {
            return String.fromCharCode(parseInt(bin, 2));
        }).join('');

        // Reply with the UTF-8 text
        await interaction.reply(`Binary: ${binary}\nText: ${text}`);
    },
};
