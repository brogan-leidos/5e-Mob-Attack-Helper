import Mob from './Mob.js'
import Weapon from './Weapon.js'
import DamageRoll from './DamageRoll.js'

export default class Skeleton extends Mob {
  constructor() {
    super();
    this.Name = "Skeleton";
    this.Icon = "\"skull\""
    
    this.Str = 0;
    this.Dex = 2;
    this.Con = 2;
    this.Int = -2;
    this.Wis = -1;
    this.Chr = -3;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Shortsword", [["ToHit", 4], ["Weapon","1d6 + 2 slashing"]]),
      new Weapon("Shortbow", [["ToHit", 4], ["Weapon","1d6 + 2 slashing"]]),
      new Weapon("Light Crossbow", [["ToHit", 4], ["Weapon","1d8 + 2 piercing"]]),
      new Weapon("Morningstar", [["ToHit", 4], ["Weapon","1d8 + 2 piercing"]])
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
