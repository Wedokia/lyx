async function loadButtons(client) {
  const { loadFiles } = require("../structures/functions/fileLoader");

  const ascii = require('ascii-table');
  const table = new ascii().setHeading("✅", "buttons", "status");

  await client.buttons.clear();

  const Files = await loadFiles("src/interactions/buttons");

  Files.forEach((file) => {
    const button = require(file)
    


    let emoji = "✅"
    let status = "EVENT LOADED"
    if (!button.id) {
      emoji = "🟥"
      status = "Missing ID"
    } else {
      client.buttons.set(button.id, button);
    }
    table.addRow(emoji, file.replace(".js", "").replace(`${process.cwd()}/src/interactions/buttons/`, ""), status);

  });

  return console.log(table.toString(), `\n Loaded ${client.buttons.size} Buttons\n`);

}

module.exports = { loadButtons };