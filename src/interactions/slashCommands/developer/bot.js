const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");

const {
  loadEvents,
  loadCommands,
  loadAppCommands,
  loadButtons,
  loadTriggers,
  loadModals,
  loadSelects
} = require("../../../utils/handlers")
  
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Avoir des infos sur le bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    // Commande Activité //
    .addSubcommand((Subcommand) =>
      Subcommand
        .setName("activity")
        .setDescription("Modifier la présence du bot")
        .addStringOption(option =>
          option.setName('type')
            .setDescription('type d\'activité ')
            .setRequired(true)
            .addChoices(
              { name: 'joue', value: 'PLAYING' },
              { name: 'stream', value: 'STREAMING' },
              { name: 'ecoute', value: 'LISTENING' },
              { name: 'regarde', value: 'WATCHING' },
            ))
        .addStringOption(option =>
          option.setName('nom')
            .setDescription('nom de l\'activité du bot')
        )
    )
    // Présence //
    .addSubcommand((Subcommand) =>
      Subcommand
        .setName("presence")
        .setDescription("Modifier la présence du bot")
        .addStringOption(option =>
          option.setName('status')
            .setDescription('statut à initialiser')
            .setRequired(true)
            .addChoices(
              { name: 'En ligne', value: 'online' },
              { name: 'Inactif', value: 'idle' },
              { name: 'Ne pas déranger', value: 'dnd' },
              { name: 'Hors ligne', value: 'invisible' },
            )
        )
    )
    // Commande reload
    .addSubcommand((Subcommand) =>
      Subcommand
        .setName("reload")
        .setDescription("Recharger les commandes / events")
        .addStringOption(option =>
          option.setName('handler')
            .setDescription('handler à redémarrer')
            .setRequired(true)
            .addChoices(
              { name: 'applicationCommands', value: 'applicationCommands' },
              { name: 'events', value: 'events' },
              { name: 'commands', value: 'commands' },
              { name: 'buttons', value: 'buttons' },
              { name: 'modals', value: 'modals' },
              { name: 'select-menus', value: 'select-menus' },
              { name: 'triggers', value: 'triggers' }
            ))
    ),
  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "presence": {
        const status = interaction.options.getString("status") || "online"
        await client.user.setStatus(status)
        return interaction.reply(`status set to \`${status.toUpperCase()}\``)

        break;
      }
      // Reload Command //
      case "reload": {
        const handler = interaction.options.getString('handler');
        switch (handler) {
          case "applicationCommands": {
            loadAppCommands(client);
            interaction.reply({ content: "ApplicationCommands rechargées" })
            break;
          }
            case "commands": {
            loadCommands(client);
            interaction.reply({ content: "Commandes rechargées" })
            break;
          }
            case "triggers": {
            loadTriggers(client);
            interaction.reply({ content: "Triggers rechargés" })
            break;
          }
            case "select-menus": {
            loadSelects(client);
            interaction.reply({ content: "SelectMenus rechargés" })
            break;
          }
            case "modals": {
            loadModals(client);
            interaction.reply({ content: "Modals rechargés" })
            break;
          }
          case "events": {
            loadEvents(client);
            interaction.reply({ content: "Évents rechargés" })
          }
          case "buttons": {
            loadButtons(client);
            interaction.reply({ content: "Boutons rechargés" })
          }
        }
        break;
      }

      case "activity": {
        let ID = 0;
        const type = interaction.options.getString("type") || "PLAYING";
        const name = interaction.options.getString("nom") || `${client.guilds.cache.size} servers`;

        switch (type) {
          case "PLAYING": {
            ID = 0;
            break;
          }
          case "STREAMING": {
            ID = 1;
            break;
          }
          case "LISTENING": {
            ID = 2;
            break;
          }
          case "WATCHING": {
            ID = 3;
            break;
          }
          case "COMPETING": {
            ID = 4;
            break;
          }
          case "CUSTOM": {
            ID = 5;
            break;
          }
        }
        await client.user.setActivity(`${name}`, { type: ID })
        interaction.reply(`Activité : \`${type} (${ID}): ${name}\``)
        break;
      }

    }
  }
}