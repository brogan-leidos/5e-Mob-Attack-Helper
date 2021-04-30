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
    this.inflictions = [];
    this.crit = false;
    this.miss = false;
    this.other = {};

  }
    addInfliction(infliction) {
      this.inflictions.push(infliction)
    }

    printInflictions() {
      if (this.inflictions.length == 0) {
        return "";
      }

      var ret =  `Inflicted: `;
      for (var i=0; i < this.inflictions.length; i++){
        ret += this.inflictions[i];
        ret += ", ";
      }
      ret = ret.substr(0, ret.length - 2);
      return ret;
    }

    addCrit() {
      this.crit = true;
    }

    addMiss() {
      this.miss = true;
    }

    addOther(name, value) {
      if (!this.other[name]) {
        this.other[name] = 0;
      }
      this.other[name] += value;
    }

    printOther() {
      var output = "";
      var keys = this.other.keys();
      for (var i=0; i < keys.length; i++) {
        output += `${keys[i]}: ${this.other[keys[i]]},`
      }
      output = output.substr(0, output.length - 1);
      return output;
    }

    printOutput() {
      var critOut = "";
      if (this.crit && !this.miss) {
        critOut = "Crit!";
      }
      else if (this.crit && this.miss) {
        critOut = "Crit Miss!";
      }

      return `${critOut} ${this.printInflictions()} ${this.printOther()}`;
    }
 
}
