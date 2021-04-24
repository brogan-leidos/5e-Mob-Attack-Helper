import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class GiantOwl extends Mob {
  constructor() {
    super();
    this.Name = "GiantOwl";
    this.Icon = "\"owl\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Talons", [["ToHit", 3],  ["IsMelee", true], ["Weapon","2d6 + 1 slashing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
