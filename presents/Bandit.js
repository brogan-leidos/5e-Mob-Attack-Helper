import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Bandit extends Mob {
  constructor() {
    super();
    this.Name = "Bandit";
    this.Icon = "\"shade\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Scimitar", [["ToHit", 3],  ["IsMelee", true], ["Weapon","1d6 + 1 slashing"]]),
      new Weapon("Light Crossbow", [["ToHit", 3],  ["IsMelee", false], ["Weapon","1d8 + 1 piercing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
