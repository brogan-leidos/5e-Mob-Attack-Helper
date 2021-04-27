import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class FlyingSnake extends Mob {
  constructor() {
    super();
    this.Name = "Flying Snake";
    this.Icon = "\"snake\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 6],  ["IsMelee", true], ["Weapon","1 piercing"], ["Extra Damage", "3d4 poison"],]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
