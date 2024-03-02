const { SlashCommandBuilder } = require('discord.js');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
    // This is the default and can be omitted
    apiKey: process.env.OPENAI_API_KEY,
  });


module.exports = {
    data: new SlashCommandBuilder()
        .setName('pythonsyntax')
        .setDescription('Ask me anything about Python syntax!')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('What do you want to know about Python?')
                .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');

        try {
            const completion = await openai.chat.completions.create({
                // Or another model suited for your needs
                model: 'gpt-3.5-turbo',
                messages: [{ role:'user', content: `Explain the following Python concept and provide an example: ${query}` }],
                stream: true,
            });
            let response = '';
            let firstMessage = true;
            for await (const message of completion) {
                if (firstMessage) {
                    firstMessage = false;
                    response += message.choices[0]?.delta?.content;
                    await interaction.deferReply(response);
                }
                else {
                    if (message.choices[0]?.delta?.content !== undefined){
                        response += message.choices[0]?.delta?.content;
                        await interaction.editReply(response);
                    }
                }
                
            }
            console.log(response);
            
        }
        catch (error) {
            console.error(error);
            interaction.reply('There was an error processing your request.');
        }
    },
};
