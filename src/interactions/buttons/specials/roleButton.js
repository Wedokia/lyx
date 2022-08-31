module.exports = {

  id: "roleButton",
  execute(interaction, client, roleID) {

    const guild = interaction.guild;
    const role = guild.roles.cache.get(roleID);
    const member = interaction.member

    if (!role)
      return interaction.reply({
        content: "Le rôle assigné à ce bouton n'existe pas/plus",
        ephemeral: true
      })



  }
}