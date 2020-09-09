import Weapon from '../presents/Weapon.js'

// Converts a weapon into an html option
export function weaponsToHtml(weapons) {
  // weapons is a weapons array
  
  var htmlReturn = "";
  for(var i=0; i < weapons.length; i++) {    
    var weapon = weapons[i];
    var weaponString = "";
    if (!weapon.WeaponString) {
      weaponString = weapon.NumDice.toString() + "d" + weapon.DamageDie.toString() + " + " + 
        weapon.BonusToDmg.toString() + " " + weapon.DamageType;
    } 
    else {
      weaponString = weapon.WeaponString;
    }

    htmlReturn += `
      <option id="${weapon.Name}" value="ToHit:${weapon.BonusToHit.toString()} Weapon:${weaponString} Weapon2:${weapon.WeaponString2}">
        ${weapon.Name}
      </option>
    `
  }
  return htmlReturn;
 
}
