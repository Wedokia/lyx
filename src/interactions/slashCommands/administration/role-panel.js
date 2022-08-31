const {
  EmbedBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  PermissionsBitField,
  SlashCommandBuilder
} = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("role-panel")
    .setDescription("Créer un dépliant de rôles")
    .setDefaultMemberPermissions(PermissionsBitField.Administrator)
    .addStringOption(option =>
      option.setName('description')
        .setDescription('descriptionr')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('roles')
        .setDescription('donner une liste des rôles en les mentionnant')
        .setRequired(true)
    ),
  
  async execute(interaction, client) {
    const roleIds = interaction.options.getString("roles").match(/<@&(\d{17,19})>/g) || [];
    const description = interaction.options.getString("description").replace('\n', `
`);
    const embed = new EmbedBuilder();
    let rolesList = [];

    if (!roleIds.length) {
      embed
        .setColor("Red")
        .setDescription(`You haven't provided valid roles`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    let invalidRoles = [];

    for (let i = 0; i < roleIds?.length; i++) {
      const id = roleIds[i].slice(3, -1);
      const role = await interaction.guild.roles.cache.get(id);
      if (role.managed) invalidRoles.push(role);
      rolesList.push({ label: role.name, value: role.id, description: `Gagner/perdre le Rôle ${role.name}` });
    }

    if (invalidRoles.length) {
      embed
        .setColor("Red")
        .setDescription(`Vous avez inséré des rôles invalides: ${invalidRoles.map((r) => r).join(", ")}`);
      return interaction.reply({ embeds: [embed] });
    }

    const mainEmbed = new EmbedBuilder()
      .setColor("NotQuiteBlack")
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
      .setDescription(description.substring(0, 4096));

    const rolesMenu = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("role-menu")
        .setPlaceholder("Choisissez un rôle !")
        .addOptions(rolesList)
    );

    await interaction.channel.send({ embeds: [mainEmbed], components: [rolesMenu] }).then(() => {
      embed
        .setColor("Green")
        .setDescription(`Le dropDowm Menu a été créé`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }).catch(() => {
      embed
        .setColor("Red")
        .setDescription(`Erreur lors de la création du menu dépliant`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    });
  },
};