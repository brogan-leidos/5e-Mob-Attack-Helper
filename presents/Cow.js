import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Cow extends Mob {
  constructor() {
    super();
    this.Name = "Cow";
    this.Icon = "\"cow\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Gore", [["ToHit", 6],  ["IsMelee", true], ["Weapon","1d6 + 4 piercing"]]),
      new Weapon("Gore (Charge)", [["ToHit", 6],  ["IsMelee", true], ["Weapon","1d6 + 4 piercing"], ["Extra Damage", "2d6 piercing"]]),           
    ];
    
    this.EquipWeapon = this.Weapons[1];
    
    this.Variants = [];
  }
  
}
