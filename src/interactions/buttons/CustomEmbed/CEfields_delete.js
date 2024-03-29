const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  id: "CEfields_delete",
  permission: PermissionFlagsBits.ManageMessages,

  async execute(interaction, client) {
    // embeds
    const embeds = interaction.message.embeds;
    let modifiedEmbed = EmbedBuilder.from(embeds[1]);

    // utilities
    const error = client.tools.error;

    const FieldEmbed = client.tools.embeds.fieldEmbed;

    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
    });

    client.tools.buttons(client, interaction, collector, "delete");

    let msgEmbed = new EmbedBuilder().setColor("F4D58D");

    interaction.reply({
      embeds: [msgEmbed.setDescription("Entrez l'index du champ")],
    });

    collector.on("collect", (m) => {
      let index = parseInt(m.content);

      if (isNaN(index)) {
        return error(interaction, "L'index doit nécessairement être un nombre", m);
      }
      if (index > 25 || index < 0) {
        return error(interaction, "L'index doit se trouver entre 0 et 25", m);
      }
      if (!modifiedEmbed.data.fields[index]) {
        return error(interaction, `L'index ${index} n'existe pas`, m);
      }

      interaction.editReply({
        embeds: [msgEmbed.setDescription(`Champ\`${index}\` supprimé!`)],
      });

      interaction.message
        .edit({
          embeds: [FieldEmbed, modifiedEmbed.spliceFields(index, 1)],
        })
        .then(() => setTimeout(() => m.delete(), 1000));
    });
  },
};