import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Zombie extends Mob {
  constructor() {
    super();
    this.Name = "Zombie";
    this.Icon = "\"zombie\""
    
    this.Str = 1;
    this.Dex = -2;
    this.Con = 3;
    this.Int = -4;
    this.Wis = -2;
    this.Chr = -3;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Slam", [["ToHit", 3],  ["IsMelee", true], ["Weapon","1d6 + 1 bludgeoning"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
