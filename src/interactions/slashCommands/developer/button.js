const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("test")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const button = new ActionRowBuilder()
      .addComponents(new ButtonBuilder()
        .setCustomId("test")
        .setLabel("Click Me!")
        .setStyle(ButtonStyle.Primary)
      )

    interaction.reply({
      components: [button]
    });
  }
}