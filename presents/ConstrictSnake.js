import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class ConstrictSnake extends Mob {
  constructor() {
    super();
    this.Name = "Constrictor Snake";
    this.Icon = "\"snake\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 4],  ["IsMelee", true], ["Weapon","1d6 + 2 piercing"]]),
      new Weapon("Constrict", [["ToHit", 4],  ["IsMelee", true], ["Weapon","1d8 + 2 bludgeoning"], ["Condition", "Grappled"], ["Condition", "Restrain"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
    this.Variants = ["Poisonous Snake", "Giant Poisonous Snake", "Constrictor Snake", "Flying Snake"];

  }
  
}
