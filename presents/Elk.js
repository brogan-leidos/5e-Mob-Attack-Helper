import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Elk extends Mob {
  constructor() {
    super();
    this.Name = "Elk";
    this.Icon = "\"elk\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Ram", [["ToHit", 5], ["Weapon","1d6 + 3 bludgeoning"]]),
      new Weapon("Hooves", [["ToHit", 5], ["Weapon","2d4 + 3 bludgeoning"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
