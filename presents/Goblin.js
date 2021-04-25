import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Goblin extends Mob {
  constructor() {
    super();
    this.Name = "Goblin";
    this.Icon = "\"goblin\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Scimitar", [["ToHit", 4],  ["IsMelee", true], ["Weapon","1d6 + 2 slashing"]]),
      new Weapon("Shortbow", [["ToHit", 4],  ["IsMelee", false], ["Weapon","1d6 + 2 piercing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
