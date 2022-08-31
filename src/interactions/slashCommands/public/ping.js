const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction) {
    const tryPong = await interaction.reply({ content: "Pong!", fetchReply: true });

    interaction.editReply({ content: `Pong! \`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\` ` });
  }
}