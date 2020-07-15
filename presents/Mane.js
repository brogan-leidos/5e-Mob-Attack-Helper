import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Mane extends Mob {
  constructor() {
    super();
    this.Name = "Mane";
    this.Icon = "\"devil\""   
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Claws", 2, 4, "slashing", 2, 0),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
