import * from './Mob'
import Weapon from './Weapon'
import DamageRoll from './DamageRoll'

export default class Skeleton extends Mob {
  constructor() {
    this.Name = "Skeleton";
    
    this.Str = 0;
    this.Dex = 2;
    this.Con = 2;
    this.Int = -2;
    this.Wis = -1;
    this.Chr = -3;
    
    this.DamageRoll = new DamageRoll();
    
    this.Weapons = [
      new Weapon("Shortsword", "1d6", "slashing", 4, 2),
      new Weapon("Shortbow", "1d6", "piercing", 4, 2),
      new Weapon("Light Crossbow", "1d8", "piercing", 4, 2),
    ];
    
    this.EquipWeapon = this.Weapons[0];
    
  }
  
}
