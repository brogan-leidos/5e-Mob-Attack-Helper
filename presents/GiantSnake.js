import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class GiantSnake extends Mob {
  constructor() {
    super();
    this.Name = "Giant Poisonous Snake";
    this.Icon = "\"snake\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 6],  ["IsMelee", false], ["Weapon","1d4 + 4 piercing"], ["DC", 11, "Con"], ["Damage (1/2 on save)", "3d6 poison"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
    this.Variants = ["Poisonous Snake", "Giant Poisonous Snake", "Constrictor Snake", "Flying Snake"];

  }
  
}
