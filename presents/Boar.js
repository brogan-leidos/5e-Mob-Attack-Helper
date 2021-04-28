import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Boar extends Mob {
  constructor() {
    super();
    this.Name = "Boar";
    this.Icon = "\"boar\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Tusk", [["ToHit", 3],  ["IsMelee", true], ["Weapon","1d6 + 1 slashing"]]),
      new Weapon("Tusk (Charge)", [["ToHit", 3],  ["IsMelee", true], ["Weapon","1d6 + 1 slashing"], ["Extra Damage", "1d6 + 0 slashing"], ["DC", 11, "Str"], ["Condition", "Knock Prone"]]),      
    ];
    
    this.EquipWeapon = this.Weapons[1];
    
    this.Variants = ["Boar", "Giant Boar"];

  }
  
}
