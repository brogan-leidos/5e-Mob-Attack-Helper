import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Hobgoblin extends Mob {
  constructor() {
    super();
    this.Name = "Hobgoblin";
    this.Icon = "\"goblin\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Longsword", [["ToHit",3],  ["IsMelee", true], ["Weapon","1d8 + 1 slashing"]]),
      new Weapon("Longsword (2 hands)", [["ToHit",3],  ["IsMelee", true], ["Weapon","1d10 + 1 slashing"]]),
      new Weapon("Longbow", [["ToHit", 3],  ["IsMelee", false], ["Weapon","1d8 + 1 piercing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
