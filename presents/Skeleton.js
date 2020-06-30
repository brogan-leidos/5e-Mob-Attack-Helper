import * from './Mob'
import Weapon from './Weapon'

export default class Skeleton extends Mob {
  constructor() {
    this.Str = 0;
    this.Dex = 0;
    this.Con = 0;
    this.Int = 0;
    this.Wis = 0;
    this.Chr = 0;
    
    this.Weapons = [
      new Weapon("Shortsword", "1d6", "slashing", true),
    ]
    
  }
  
}
