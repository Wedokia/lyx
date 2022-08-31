const { loadAppCommands } = require('../../utils/handlers')

const mongoose = require('mongoose')

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await client.user.setStatus('idle');
    await client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 0 });

    loadAppCommands(client)

    mongoose.connect(process.env["DATABASE_URI"], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log(`\nDB connectée\n`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};