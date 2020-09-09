export default class Weapon {    
    constructor (name="", numdice=0, ddie="", dtype="", hit=0, dmg=0){
        this.Name = name
        this.NumDice = numdice
        this.DamageDie = ddie        
        this.DamageType = dtype
        this.BonusToHit = hit
        this.BonusToDmg = dmg
        this.WeaponString = "";
        this.WeaponString2 = "";
    }
    
     constructor (name="", weapon="", weapon2="") {
        this.Name = name;
        this.WeaponString = weapon;
        this.WeaponString2 = weapon2;
    }       
}
