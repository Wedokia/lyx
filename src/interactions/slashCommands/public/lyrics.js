const { ChatInputCommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Récupérer les paroles d'un son")
    .addStringOption(option =>
      option
        .setName("titre")
        .setDescription("Titre de la musique")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder();
    await interaction.deferReply();

    axios.get(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(interaction.options.getString("titre"))}`).then(async (response) => {
      embed
        .setColor("NotQuiteBlack")
        .setAuthor({ name: response.data.title })
        .setURL(response.data.links.genius)
        .setThumbnail(response.data.thumbnail.genius)
        .setFooter({ text: `Par ${response.data.author}` })
        .setDescription(response.data.lyrics.slice(0, 4096));

      await interaction.editReply({ embeds: [embed] });
    }).catch(() => {
      embed
        .setColor("Red")
        .setDescription(`Je n'ai pu trouver aucune musique avec ce titre`);
      return interaction.editReply({ embeds: [embed], ephemeral: true });
    });
  },
};