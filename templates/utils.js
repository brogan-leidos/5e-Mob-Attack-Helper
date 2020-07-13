import Weapon from '../presents/Weapon.js'

// Converts a weapon into an html option
export function weaponsToHtml(weapons) {
  // weapons is a weapons array
  
  htmlReturn = "";
  for(var i=0; i < weapons.length; i++) {    
    weapon = weapons[i];
    htmlReturn += `
      <option id="weapon.Name">
        weapon.Name
      </option>
    `
  }
 
}
