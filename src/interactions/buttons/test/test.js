module.exports = {
  id: "test",
  execute(interaction) {
    const { message } = interaction;
    const { components } = message;
    interaction.reply({ content: "TEST", ephemeral: true })
    message.edit({
      content: interaction.message.content + `\n${components}`,
      components: components
    });
  }
}