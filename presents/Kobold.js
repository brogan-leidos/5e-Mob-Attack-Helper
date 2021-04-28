import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Kobold extends Mob {
  constructor() {
    super();
      this.Name = "Kobold";
      this.Icon = "\"dragon\""
      
      this.DamageRoll = new DamageRoll();
      
      this.Weapons = [
        new Weapon("Dagger", [["ToHit", 4],  ["IsMelee", true], ["Weapon","1d4 + 2 piercing"]]),
        new Weapon("Sling", [["ToHit", 4],  ["IsMelee", false], ["Weapon","1d4 + 2 bludgeoning"]]),
      ];
      
      this.EquipWeapon = this.Weapons[0];

      this.Variants = ["Kobold", "Winged Kobold"]
  }
  
}
