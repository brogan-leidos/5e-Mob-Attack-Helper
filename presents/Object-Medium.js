import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Object-Medium extends Mob {
  constructor() {
    super();
    this.Name = "Object-Medium";
    this.Icon = "\"robot\""
    
    this.Str = 0;
    this.Dex = 1;
    this.Con = 0;
    this.Int = -4;
    this.Wis = -4;
    this.Chr = -5;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Slam", 2, 6, "bludgeoning", 5, 1)
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
