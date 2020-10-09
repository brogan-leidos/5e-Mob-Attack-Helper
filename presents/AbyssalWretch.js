import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class AbyssalWretch extends Mob {
  constructor() {
    super();
    this.Name = "Abyssal Wretch";
    this.Icon = "\"alienmonster\""   
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 3],  ["IsMelee", true], ["Weapon","1d8 + 1 slashing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
