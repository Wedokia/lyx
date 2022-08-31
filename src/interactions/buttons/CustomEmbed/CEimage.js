const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  id: "CEimage",
  permission: PermissionFlagsBits.ManageMessages,

  async execute(interaction, client) {
    // embeds
    const embeds = interaction.message.embeds;
    let modifiedEmbed = embeds[1];

    // utilities
    const error = client.tools.error;

    const imageEmbed = client.tools.embeds.imageEmbed;

    interaction.message.edit({ embeds: [imageEmbed, embeds[1]] });

    let msgEmbed = new EmbedBuilder().setColor("F4D58D").setDescription("**Entrez un lien direct d'image**");
    interaction.reply({ embeds: [msgEmbed] });

    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
    });

    client.tools.buttons(client, interaction, collector);

    collector.on("collect", (m) => {
      let image = "";

      image = m.content;

      // check if image is valid picture url
      if (!image.match(/\.(jpeg|jpg|png)$/) || !image.match(/^https?:\/\//)) {
        return error(interaction, "Lien invalide", m);
      }

      interaction.editReply({
        embeds: [msgEmbed.setDescription(`**Envoyez un lien pour mettre à jour l'image**`)],
      });

      modifiedEmbed = EmbedBuilder.from(embeds[1]).setImage(image);

      interaction.message
        .edit({
          embeds: [imageEmbed, modifiedEmbed],
        })
        .then(() => setTimeout(() => m.delete(), 1000));
    });
  },
};