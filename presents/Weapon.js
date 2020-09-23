export default class Weapon {    
    constructor (name="", tohit=0, args){
        this.Name = name;
        this.BonusToHit = tohit;
        this.WeaponString = args[0][1];
        this.WeaponMods = args;
    }
       
    
}
