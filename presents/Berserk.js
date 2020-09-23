import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Berserk extends Mob {
  constructor() {
    super();
    this.Name = "Berserk";
    this.Icon = "\"beard\""   
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Great Ax", [["ToHit", 5], ["IsMelee", true], ["Weapon","1d12 + 3 slashing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
