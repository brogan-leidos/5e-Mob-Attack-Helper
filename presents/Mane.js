import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Mane extends Mob {
  constructor() {
    super();
    this.Name = "Manes";
    this.Icon = "\"devil\""   
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Claws", [["ToHit", 2],  ["IsMelee", true], ["Weapon","2d4 + 0 slashing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
