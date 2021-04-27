import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class GiantElk extends Mob {
  constructor() {
    super();
    this.Name = "Giant Elk";
    this.Icon = "\"elk\""
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Ram", [["ToHit", 6],  ["IsMelee", true], ["Weapon","2d6 + 4 bludgeoning"]]),
      new Weapon("Ram (Charge)", [["ToHit", 6],  ["IsMelee", true], ["Weapon","1d6 + 3 bludgeoning"], ["Extra Damage", "2d6 bludgeoning"], ["DC", 14, "Str"], ["Condition", "Knock Prone"]]),
      new Weapon("Hooves", [["ToHit", 6],  ["IsMelee", true], ["Weapon","4d8 + 4 bludgeoning"]]),
    ];
    
    this.EquipWeapon = this.Weapons[1];

    this.Variants = ["Elk", "Giant Elk"];
    
  }
  
}
