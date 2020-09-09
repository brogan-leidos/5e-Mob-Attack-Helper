import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Imp extends Mob {
  constructor() {
    super();
    this.Name = "Imp";
    this.Icon = "\"devil\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Sting", 5, "1d4 + 3 piercing", "3d6 poison"),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
