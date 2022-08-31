module.exports = {
  id: "role-menu",

  async execute(interaction, client) {
    const embed = new EmbedBuilder();

    const roleToGive = interaction.values[0];
    const roleFetched = await interaction.guild.roles.fetch(roleToGive);
    if (!roleFetched) {
      embed
        .setColor("Red")
        .setDescription(`This role doesn't exist`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (roleFetched.managed || !roleFetched.editable) {
      embed
        .setColor("Red")
        .setDescription(`I cannot give this role to you`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const hasRole = interaction.member.roles.cache.has(roleToGive);

    embed
      .setColor("Green")
      .setDescription(`Je vous ai${hasRole ? "retiré" : "donné"} le rôle ${roleFetched}.`);

    const errorEmbed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Je n'ai pas la permission de vous${hasRole ? "retirer" : "ajouter'"} ce rôle`);

    if (hasRole) {
      return interaction.member.roles.remove(roleFetched)
        .then(() => interaction.reply({ embeds: [embed], ephemeral: true }))
        .catch(() => interaction.reply({ embeds: [errorEmbed], ephemeral: true }));
    } else {
      return interaction.member.roles.add(roleFetched)
        .then(() => interaction.reply({ embeds: [embed], ephemeral: true }))
        .catch(() => interaction.reply({ embeds: [errorEmbed], ephemeral: true }));
    }
  }
}