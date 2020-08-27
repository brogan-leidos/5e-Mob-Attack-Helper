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
      new Weapon("Great Ax", 1, 12, "slashing", 5, 3)
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
