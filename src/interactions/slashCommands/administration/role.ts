const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");

const {
  loadEvents,
  loadAppCommands
} = require("../../../utils/handlers")

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Avoir des infos sur le bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    // Commande Activité //
    .addSubcommand((Subcommand) =>
      Subcommand
        .setName("create")
        .setDescription("Créer un rôle")
        .addStringOption(option =>
          option.setName('name')
            .setDescription('le nom du rôle')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('color')
            .setDescription('couleur hexadécimale du rôle')
        )
        .addBooleanOption(option =>
          option.setName("mentionable")
            .setDescription('indique si le rôle est mentionnable ou non (defaut: non)')

        )
        .addBooleanOption(option =>
          option.setName("en-évidence")
            .setDescription('indique si le rôle est mis en évidence (defaut: non)')

        )
    ),
  async execute(interaction, client/*, guildSettings, logSettings*/) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "create": {
        const name = interaction.options.getString("name");
        const color = interaction.options.getString("color") || "DEFAULT"
        const hoist = interaction.options.getBoolean("en-évidence") || false
        const mentionable = interaction.options.getBoolean('mentionable') || false

        await interaction.guild.roles.create({
          name: name,
          color: color,
          hoist: hoist,
          reason: 'rôle séries',
          mentionable: mentionable
        })
          .then(() => {
            interaction.reply(`Rôle \`${name}\` créé avec succès`)
          })
          .catch(e => {
            console.error(e)
            interaction.reply(`Erreur lors de la création du rôle.`)
          });

        break;
      }
    }
  }
}