const { Client, EmbedBuilder, SelectMenuInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @description La commande qui active les roles sur le select-menu
   */
  async execute(interaction, client) {
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId !== "role-menu") return;
    const select = client.selectMenus.get(interaction.customId);

    if (!select) if (!command) {
      await require("../messages/defaultButtonError").execute(interaction);
      return;
    }
    select.execute(interaction, client);
  }
};