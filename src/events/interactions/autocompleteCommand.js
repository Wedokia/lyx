module.exports = {
	name: "interactionCreate",

	async execute(interaction, client) {
    
		if (!interaction.isAutocomplete()) return;

		const command = client.applicationCommands.get(interaction.commandName);
		if (!command) return;


    if (command.developer && !client.config.ownerList.includes(interaction.member.user.id)) 
      return interaction.reply({content: "Vous n'avez pas les permissions requises pour exécuter cette commande.", ephemeral: true})
    
		try {
			await command.autocomplete(interaction, client);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "Une erreur s'est produite lors de l'exécution de cette commande cette commande.",
				ephemeral: true,
			});
		}
	},
};