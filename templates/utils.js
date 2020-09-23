import Weapon from '../presents/Weapon.js'

// Converts weapons into html options
export function weaponsToHtml(weapons) {
  // weapons is a weapons array
  // Example of weapon: (Name, [["ToHit", 1], ["Weapon", "1d6 + 2 slashing"], ["IsMelee", true], ["DC", 10, "Str"], ["Condition", "Restrain"]])
  
  var htmlReturn = "";

  for(var i=0; i < weapons.length; i++) {    
    var weapon = weapons[i];
    var stringify = JSON.stringify(weapon.WeaponMods);
    stringify = stringify.replace(/\"/g, "\"");

    htmlReturn += `
      <option id="${weapon.Name}" value=${stringify}>
        ${weapon.Name}
      </option>
    `
  }
  return htmlReturn;
 
}
