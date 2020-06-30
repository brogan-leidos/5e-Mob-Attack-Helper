import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Ghoul extends Mob {
  constructor() {
    super();
    this.Name = "Ghoul";
    this.Icon = "\"shade\""
    
    this.Str = 1;
    this.Dex = 2;
    this.Con = 0;
    this.Int = -2;
    this.Wis = 0;
    this.Chr = -2;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", 2, 6, "piercing", 2, 2),
      new Weapon("Claw", 2, 4, "slashing", 4, 2)
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
