import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Orc extends Mob {
  constructor() {
    super();
    this.Name = "Orc";
    this.Icon = "\"ogre\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Greataxe", [["ToHit", 5],  ["IsMelee", true], ["Weapon","1d12 + 3 slashing"]]),
      new Weapon("Javelin (Ranged)", [["ToHit", 5],  ["IsMelee", false], ["Weapon","1d6 + 3 piercing"]]),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
