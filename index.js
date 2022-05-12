module.exports = function gimmePowerPls(d) {

  let batteredOathIds = [88958, 88959, 88960, 88961, 88962, 88963, 88964, 88965, 88966, 88967, 88968, 88969, 88970, 88971, 88972, 88973, 88974, 88975, 88976, 88977, 88978, 88979];
  let powerIds = [480004, 480104, 480204, 480304];
  let minPowerRolls = 3;

  d.command.add('nmwi', {
    $none() {
      d.command.message(`Commands:`);
      d.command.message(`nmwi min (number) : Sets the minimum line number threshold for flagging items.`);
      d.command.message(`nmwi r : Reloads the module.`);
    },
    $default() {
      d.command.message(`Invalid command. Type 'nmwi' to view a list of all valid commands.`);
    },
    min(num) {
      minPowerRolls = parseInt(num);
      d.command.message(`Search limited to items with a minimum number of ${minPowerRolls} power rolls.`);
    },
    r() {
      d.command.exec(`toolbox reload no-more-wasted-infusions`);
    }
  });

  d.hook('S_ITEMLIST', '*', { order: -10001 }, (e) => {
    let found = false
    e.items.forEach(item => {
      if (batteredOathIds.includes(item.id)) {
        let count = 0
        item.passivitySets[0].passivities.forEach(id => {
          if (powerIds.includes(id)) count++;
        });
        item.enchant = count;
        if (count >= minPowerRolls) { item.masterwork = true; found = true; }
        if (count < minPowerRolls) { item.enigma = true; found = true; }
      }
    })
    if (found) return true
  });
}