import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class GiantFrog extends Mob {
  constructor() {
    super();
    this.Name = "GiantSnake";
    this.Icon = "\"snake\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 6],  ["IsMelee", false], ["Weapon","1d4 + 4 piercing"], ["DC", 13, "Con"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
