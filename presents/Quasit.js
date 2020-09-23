import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Quasit extends Mob {
  constructor() {
    super();
    this.Name = "Quasit";
    this.Icon = "\"ogre\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Claw", [["ToHit", 4],  ["IsMelee", true], ["Weapon","1d4 + 3 piercing"], ["Extra Damage", "2d4 + 0 poison"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
