import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Object-Huge extends Mob {
  constructor() {
    super();
    this.Name = "Object-Huge";
    this.Icon = "\"robot\""
    
    this.Str = 4;
    this.Dex = -2;
    this.Con = 0;
    this.Int = -4;
    this.Wis = -4;
    this.Chr = -5;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Slam", 2, 12, "bludgeoning", 8, 4)
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
