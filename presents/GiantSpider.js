import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class GiantSpider extends Mob {
  constructor() {
    super();
    this.Name = "Giant Spider";
    this.Icon = "\"spider\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 5],  ["IsMelee", true], ["Weapon","1d8 + 3 piercing"], ["DC", 11, "Con"], ["Damage (1/2 on save)", "2d8 poison"]]),
      new Weapon("Web", [["ToHit", 5],  ["IsMelee", false], ["Weapon","0"], ["Condition", "Restrain"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
    this.Variants = ["Giant Wolf Spider", "Giant Spider"];

  }
  
}
