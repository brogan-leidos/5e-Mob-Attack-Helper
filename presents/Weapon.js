export default class Weapon {    
    constructor (name="", args){
        this.Name = name;
        this.BonusToHit = args[0][1];
        this.WeaponString = args[1][1];
        this.IsMelee = args[2][1];
        this.WeaponMods = args;
    }
       
    
}
