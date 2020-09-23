import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class ObjectSmall extends Mob {
  constructor() {
    super();
    this.Name = "ObjectSmall";
    this.Icon = "\"robot\""
    
    this.Str = -2;
    this.Dex = 2;
    this.Con = 0;
    this.Int = -4;
    this.Wis = -4;
    this.Chr = -5;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Slam", [["ToHit", 6],  ["IsMelee", true], ["Weapon","1d8 + 2 bludgeoning"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
