module.exports = {
  name: "ping",
  async execute(message) {
    const tryPong = await message.reply('pong!');

    tryPong.edit(`pong! \`${tryPong.createdTimestamp - message.createdTimestamp}ms\``)
  }
}