module.exports = {
  
	async modalError(interaction) {
		await interaction.reply({
			content: "There was an issue while fetching this modal!",
			ephemeral: true,
		});
		return;
	},
};