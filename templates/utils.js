import Weapon from '../presents/Weapon.js'

// Converts a weapon into an html option
export function weaponsToHtml(weapons) {
  // weapons is a weapons array
  
  var htmlReturn = "";
  for(var i=0; i < weapons.length; i++) {    
    var weapon = weapons[i];
    htmlReturn += `
      <option id="${weapon.Name}">
        ${weapon.Name}
      </option>
    `
  }
  return htmlReturn;
 
}
