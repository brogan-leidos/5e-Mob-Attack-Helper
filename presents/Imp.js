import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Imp extends Mob {
  constructor() {
    super();
    this.Name = "Imp";
    this.Icon = "\"devil\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Sting", [["ToHit", 5],  ["IsMelee", true], ["Weapon","1d4 + 3 piercing"],["DC", 11, "Con"],["Damage (1/2 on save)", "3d6 + 0 poison"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
