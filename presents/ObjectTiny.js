import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class ObjectTiny extends Mob {
  constructor() {
    super();
    this.Name = "ObjectTiny";
    this.Icon = "\"robot\""
    
    this.Str = -3;
    this.Dex = 4;
    this.Con = 0;
    this.Int = -4;
    this.Wis = -4;
    this.Chr = -5;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Slam", [["ToHit", 8],  ["IsMelee", true], ["Weapon","1d4 + 4 bludgeoning"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
