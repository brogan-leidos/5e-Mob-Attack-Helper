import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Wolf extends Mob {
  constructor() {
    super();
    this.Name = "Wolf";
    this.Icon = "\"wolf\""
    
    this.Str = 1;
    this.Dex = 2;
    this.Con = 1;
    this.Int = -4;
    this.Wis = 1;
    this.Chr = -2;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 4], ["Weapon","2d4 + 2 piercing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
