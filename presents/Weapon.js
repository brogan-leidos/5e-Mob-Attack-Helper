export default class Weapon {    
    constructor (name="", arg1=0, arg2=0, arg3="", arg4=0, arg5=0){
        this.Name = name;
        this.NumDice = arg1;
        this.DamageDie = arg2;     
        this.DamageType = arg3;
        this.BonusToHit = arg4;
        this.BonusToDmg = arg5;
        if (typeof(arg2) === "string") {
            this.BonusToHit = arg1;
            this.WeaponString = arg2;
            this.WeaponString2 = arg3;
        }
    }
    
//      constructor (name="", tohit=0, weapon="", weapon2="") {
//         this.Name = name;
//         this.BonusToHit = tohit;
//         this.WeaponString = weapon;
//         this.WeaponString2 = weapon2;
//     }       
}
