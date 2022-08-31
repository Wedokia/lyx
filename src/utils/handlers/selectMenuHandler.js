async function loadSelects(client) {
  const { loadFiles } = require("../structures/functions/fileLoader");

  const ascii = require('ascii-table');
  const table = new ascii().setHeading("✅", "select-menus", "status");

  await client.selectMenus.clear();

  const Files = await loadFiles("src/interactions/select-menus");

  Files.forEach((file) => {
    const select = require(file)
    
    let emoji = "✅"
    let status = "SELECT-MENU LOADED"
    if (!select.id) {
      emoji = "🟥"
      status = "missing Id"
    } else {
      client.selectMenus.set(select.id, select)
    }

    table.addRow(emoji, file.replace(".js", "").replace(`${process.cwd()}/src/interactions/select-menus/`, ""), status);
  })

  return console.log(table.toString(),  `\n Loaded ${client.selectMenus.size} Select-Menus\n`);

}

module.exports = { loadSelects };