import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Object-Small extends Mob {
  constructor() {
    super();
    this.Name = "Object-Small";
    this.Icon = "\"robot\""
    
    this.Str = -3;
    this.Dex = 4;
    this.Con = 0;
    this.Int = -4;
    this.Wis = -4;
    this.Chr = -5;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Slam", 1, 8, "bludgeoning", 6, 2)
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
