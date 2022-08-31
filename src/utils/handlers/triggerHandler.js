async function loadTriggers(client) {
  const { loadFiles } = require("../structures/functions/fileLoader");

  const ascii = require('ascii-table');
  const table = new ascii().setHeading("✅", "triggers", "status");

  await client.triggers.clear();

  const Files = await loadFiles("src/messages/triggers");

  Files.forEach((file) => {
    const trigger = require(file)
    
    let emoji = "✅"
    let status = "EVENT LOADED"
    if (!trigger.name) {
      emoji = "🟥"
      status = "Missing ID"
    } else {
      client.triggers.set(trigger.name, trigger);
    }
    table.addRow(emoji, file.replace(".js", "").replace(`${process.cwd()}/src/messages/triggers/`, ""), status);

  });

  return console.log(table.toString(),  `\n Loaded ${client.triggers.size} Triggers\n`);

}

module.exports = { loadTriggers };