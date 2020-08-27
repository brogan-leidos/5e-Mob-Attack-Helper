import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Dretch extends Mob {
  constructor() {
    super();
    this.Name = "Dretch";
    this.Icon = "\"ogre\""   
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Claws", 2, 4, "slashing", 2, 0),
      new Weapon("Bite", 1, 6, "piercing", 2, 0),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
