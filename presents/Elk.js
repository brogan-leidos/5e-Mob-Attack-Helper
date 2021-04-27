import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Elk extends Mob {
  constructor() {
    super();
    this.Name = "Elk";
    this.Icon = "\"elk\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Ram", [["ToHit", 5],  ["IsMelee", true], ["Weapon","1d6 + 3 bludgeoning"]]),
      new Weapon("Ram (Charge)", [["ToHit", 5],  ["IsMelee", true], ["Weapon","1d6 + 3 bludgeoning"], ["Extra Damage", "2d6 + 0 bludgeoning"], ["DC", 13, "Str"], ["Condition", "Knock Prone"]]),
      new Weapon("Hooves", [["ToHit", 5],  ["IsMelee", true], ["Weapon","2d4 + 3 bludgeoning"]]),
    ];
    
    this.EquipWeapon = this.Weapons[1];
    
    this.Variants = ["Elk", "Giant Elk"];
  }
  
}
