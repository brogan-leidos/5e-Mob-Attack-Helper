import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class WingedKobold extends Mob {
  constructor() {
    super();
      this.Name = "Winged Kobold";
      this.DisplayName = "Winged Kobold";
      this.Icon = "\"dragon\""
      
      this.DamageRoll = new DamageRoll();
      
      this.Weapons = [
        new Weapon("Dagger", [["ToHit", 5],  ["IsMelee", true], ["Weapon","1d4 + 3 piercing"]]),
        new Weapon("Drop Rock", [["ToHit", 5],  ["IsMelee", false], ["Weapon","1d6 + 3 bludgeoning"]]),
      ];
      
      this.EquipWeapon = this.Weapons[0];

      this.Variants = ["Kobold", "Winged Kobold"]
  }
  
}
