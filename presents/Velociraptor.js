import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Velociraptor extends Mob {
  constructor() {
    super();
    this.Name = "Velociraptor";
    this.Icon = "\"rex\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Bite", [["ToHit", 4],  ["IsMelee", true], ["Weapon","1d6 + 2 piercing"]]),
      new Weapon("Claws", [["ToHit", 4],  ["IsMelee", true], ["Weapon","1d4 + 2 slashing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
