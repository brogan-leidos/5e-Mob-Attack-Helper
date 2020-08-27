import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Elk extends Mob {
  constructor() {
    super();
    this.Name = "Elk";
    this.Icon = "\"elk\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Ram", 1, 6, "bludgeoning ", 5, 3),
      new Weapon("Hooves", 2, 4, "bludgeoning ", 5, 3),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
