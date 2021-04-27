import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class GiantBoar extends Mob {
  constructor() {
    super();
    this.Name = "Giant Boar";
    this.Icon = "\"boar\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Tusk", [["ToHit", 5],  ["IsMelee", true], ["Weapon","2d6 + 3 slashing"]]),
      new Weapon("Tusk (Charge)", [["ToHit", 3],  ["IsMelee", true], ["Weapon","2d6 + 1 slashing"], ["Extra Damage", "2d6 + 0 slashing"], ["DC", 13, "Str"], ["Condition", "Knock Prone"]]),      
    ];
    
    this.EquipWeapon = this.Weapons[1];
    
    this.Variants = ["Boar", "Giant Boar"];

  }
  
}
