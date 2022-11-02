

module.exports = {

	async onMentionMessage(message, client) {
    const prefix = client.config.bot.prefix;
		return message.channel.send(
			`Hi ${message.author}! My prefix is \`${prefix}\`, get help by \`${prefix}help\``
		);
	},
};