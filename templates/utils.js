import Weapon from '../presents/Weapon.js'

// Converts weapons into html options
export function weaponsToHtml(weapons) {
  // weapons is a weapons array
  // Example of weapon: (Name, [["ToHit", 1], ["Weapon", "1d6 + 2 slashing"], ["IsMelee", true], ["DC", 10, "Str"], ["Condition", "Restrain"]])
  
  var htmlReturn = "";

  for(var i=0; i < weapons.length; i++) {    
    var weapon = weapons[i];
    var stringify = JSON.stringify(weapon.WeaponMods);
    stringify = stringify.replace(/\"/g, "'");

    htmlReturn += `
      <option id="${weapon.Name}" value="${stringify}" >
        ${weapon.Name}
      </option>
    `
  }
  return htmlReturn;
 
}

export default class CreatureNotes {
  constructor() {
    this.output = "";
    this.inflictions = [];

  }
    addInfliction(infliction) {
      this.inflictions.push(infliction)
    }

    printInflictions() {
      ret =  `Inflicted: `;
      for (var i=0; i < this.inflictions.length; i++){
        ret += this.inflictions[i];
        ret += ", ";
      }
      ret = ret.substr(0, ret.length - 2);
      return ret;
    }

    addCrit() {
      this.output += "Crit!"
    }
 
}
