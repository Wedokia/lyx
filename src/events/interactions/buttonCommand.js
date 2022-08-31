const { ButtonInteraction } = require("discord.js");
const { buttonError } = require('../../messages/defaultMessages')

module.exports = {
  name: "interactionCreate",
  execute(interaction, client) {
    if (!interaction.isButton()) return;
    const Button = client.buttons.get(interaction.customId);

    if (!Button) {
      if ((interaction.customId).startsWith("roles-")) {
        const roleButton = client.buttons.get('roleButton')
        const roleID = interaction.customId.replace('roles-', "")
        roleButton.execute(interaction, client, roleID)
      } else {
        buttonError(interaction);
      }
    }
    else {
      Button.execute(interaction, client);
    }
  }
}