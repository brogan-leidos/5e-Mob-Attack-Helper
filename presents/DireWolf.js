import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class DireWolf extends Mob {
  constructor() {
    super();
    this.Name = "Dire Wolf";
    this.Icon = "\"wolf\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 5],  ["IsMelee", true], ["Weapon","2d6 + 3 piercing"], ["DC", 13, "Str"], ["Condition", "Knock Prone"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];

    this.Variants = ["Wolf", "Dire Wolf"];
    
  }
  
}
