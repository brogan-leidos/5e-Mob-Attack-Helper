import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class GiantWolfSpider extends Mob {
  constructor() {
    super();
    this.Name = "Giant Wolf Spider";
    this.Icon = "\"spider\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 3],  ["IsMelee", true], ["Weapon","1d6 + 1 piercing"], ["DC", 11, "Con"], ["Damage (1/2 on save)", "2d6 poison"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
    this.Variants = ["Giant Wolf Spider", "Giant Spider"];

  }
  
}
