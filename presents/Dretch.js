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
      new Weapon("Claws", [["ToHit", 2], ["Weapon","2d4 + 0 slashing"]]),
      new Weapon("Bite", [["ToHit", 2], ["Weapon","1d6 + 0 piercing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
