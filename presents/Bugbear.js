import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Bugbear extends Mob {
  constructor() {
    super();
    this.Name = "Bugbear";
    this.Icon = "\"goblin\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Morningstar", [["ToHit", 4],  ["IsMelee", true], ["Weapon","2d8 + 2 piercing"]]),
      new Weapon("Javelin (Melee)", [["ToHit", 4],  ["IsMelee", true], ["Weapon","2d6 + 2 piercing"]]),
      new Weapon("Javelin (Ranged)", [["ToHit", 4],  ["IsMelee", false], ["Weapon","1d6 + 2 piercing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
