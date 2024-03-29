const { PermissionFlagsBits } = require("discord.js");
const { Embed } = require("../../../utils/structures/models");

module.exports = {
  id: "CEcancel",
  permission: PermissionFlagsBits.ManageMessages,

  async execute(interaction, client) {
    const { guild, user } = interaction;
    // find doc
    let data = await Embed.findOne({ _id: guild.id });

    // find userObject
    let userObject = await data.users.find((u) => u.userId === user.id);

    delete userObject["sendChannel"];
    delete userObject["sendMessage"];
    delete userObject["messageId"];
    delete userObject["interactionMessage"];
    delete userObject["interactionChannel"];

    data.markModified("users");
    await data.save();

    // delete the message
    await interaction.reply({ content: "annulé", ephemeral: true }).then(() => {
      interaction.message.delete();
    });
  },
};