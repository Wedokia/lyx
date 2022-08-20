const mongoose = require('mongoose')

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await client.user.setStatus('idle');
    await client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 1 });

    mongoose.connect(process.env["DATABASE_URI"])
      .then(() => {
        console.log(`\nDB connectée\n`);
      })
      .catch(err => { console.log(err) });
  },
};