import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class PoisonSnake extends Mob {
  constructor() {
    super();
    this.Name = "Poisonous Snake";
    this.Icon = "\"snake\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 5],  ["IsMelee", true], ["Weapon","1 piercing"], ["DC", 10, "Con"], ["Damage (1/2 on save)", "2d4 poison"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
    this.Variants = ["Poisonous Snake", "Giant Poisonous Snake", "Constrictor Snake", "Flying Snake"];

  }
  
}
