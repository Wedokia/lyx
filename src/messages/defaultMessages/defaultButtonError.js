module.exports = {
  
	async buttonError(interaction) {
		await interaction.reply({
			content: "Une erreur s'est produite lors de l'interaction avec le bouton.",
			ephemeral: true,
		});
		return;
	},
};