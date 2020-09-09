export default class Weapon {    
    constructor (name="", numdice=0, ddie=0, dtype="", hit=0, dmg=0){
        this.Name = name
        this.NumDice = numdice
        this.DamageDie = ddie        
        this.DamageType = dtype
        this.BonusToHit = hit
        this.BonusToDmg = dmg
        if (typeof(this.NumDice) === "string") {            
            this.WeaponString = numdice;
            this.WeaponString2 = ddie;
        }
    }
    
//      constructor (name="", tohit=0, weapon="", weapon2="") {
//         this.Name = name;
//         this.BonusToHit = tohit;
//         this.WeaponString = weapon;
//         this.WeaponString2 = weapon2;
//     }       
}
