const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autocomplete')
    .setDescription('Autocomplete command')
    .addStringOption(option =>
      option.setName('couleur')
        .setDescription('Couleur basée sur l\'autocomplete.')
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = ['rouge', 'bleu', 'vert', 'blanc', 'noir'];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map(choice => ({ name: choice, value: choice })),
    );
  },

  async execute(interaction) {
    const option = interaction.options.getString('couleur');
    await interaction.reply({ content: `Tu m'as dit: ${option}` })
  }

}