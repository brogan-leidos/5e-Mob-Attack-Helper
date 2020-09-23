import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class ObjectMedium extends Mob {
  constructor() {
    super();
    this.Name = "ObjectMedium";
    this.Icon = "\"robot\""
    
    this.Str = 0;
    this.Dex = 1;
    this.Con = 0;
    this.Int = -4;
    this.Wis = -4;
    this.Chr = -5;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Slam", [["ToHit", 5],  ["IsMelee", true], ["Weapon","2d6 + 1 bludgeoning"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
