const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("series-role")
    .setDescription("Gérer les rôles séries")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)

    // create //
    .addSubcommand((Subcommand) =>
      Subcommand
        .setName("create")
        .setDescription("Créer un rôle série")
        .addStringOption(option =>
          option.setName('name')
            .setDescription('le nom du rôle')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('type')
            .setDescription('type d\'oeuvre')
            .setChoices(
              { name: "Licencié", value: "Licencié" },
              { name: "Action", value: "Action" },
              { name: "Romance", value: "Romance" },
              { name: "Co-Prod", value: "Co-Prod" },
              { name: "X", value: "X" },
              { name: "LN", value: "LN" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((Subcommand) =>
      Subcommand
        .setName("edit")
        .setDescription("Créer un rôle")
        .addRoleOption(option =>
          option.setName('rôle')
            .setDescription('rôle à éditer')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('new-type')
            .setDescription('type à assigner au rôle')
            .setChoices(
              { name: "Licencié", value: "Licencié" },
              { name: "Action", value: "Action" },
              { name: "Romance", value: "Romance" },
              { name: "Co-Prod", value: "Co-Prod" },
              { name: "X", value: "X" },
              { name: "LN", value: "LN" }
            )
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand();


    const type = interaction.options.getString("type");
    let roleID = ""

    if (type) {
      switch (type) {
        case "Licencié": {
          color = "f6c94f";
          roleID = "1011045135078928514";
          break;
        }
        case "Action": {
          color = "c34a4a";
          roleID = "1011056155176468491";
          break;
        }
        case "Romance": {
          color = "ffaaee";
          roleID = "1011061384307540129";
          break;
        }
        case "Co-Prod": {
          color = "ff5300";
          roleID = "1011182976899485716";
          break;
        }
        case "X": {
          color = "ff55aa";
          roleID = "1011283213563461632";
          break;
        }
        case "LN": {
          color = "00ddff";
          roleID = "1011319284045185065";
          break;
        }
      }
      const refRole = interaction.guild.roles.cache.get(roleID);
      const position = refRole.position + 1

    }


    switch (sub) {
      case "create": {
        const name = interaction.options.getString("name");



        // const response = await interaction.reply({ content: "<a:loading:1011382677254971472> Patientez un instant.", fetchReply: true, ephemeral: true });
        await interaction.guild.roles.create({
          name: name,
          color: color,
          reason: 'rôle séries', type,
          position: position
        }).then(() => {
          interaction.reply(`Rôle ${type} \`${name}\` (position: ${position}) créé avec succès`)
        }).catch(e => {
          console.error(e)
          interaction.reply(`Erreur lors de la création du rôle.`)
        });


        break;
      }
      case "edit": {
        return interaction.reply("Subcommand encore en construction. \nMerci de patienter un peu.")
      }
    }
  }
}