import Weapon from "./Weapon.js"
import DamageRoll from './DamageRoll.js'

export default class Mob {
    constructor(name= "", icon= "", weapon=null, vantage=0, mobname="default") {
    this.AC = 0;
    this.Health = 0;
    this.Str = 0;
    this.Dex = 0; 
    this.Con = 0; 
    this.Int = 0;
    this.Wis = 0;
    this.Chr = 0;
    this.Weapons = [];
    this.EquipWeapon = weapon;
        
    this.Name = name;
    this.Icon = icon;
        
    this.MobName = mobname;
        
    this.rollClass = new DamageRoll();
    this.Vantage = vantage;

    // NOT SUPER INTUITIVE - MAY CHANGE LATER: Anything that has a "weapon 2" has additional effects (think Imp extra poison damage)
    // These "weapon 2"s are in the weapon array immediately following 
    this.HasWeaponTwo = false;
    
    }
    
    
    // Make an attack roll, modify by equip weapon
    makeAttack() {
        this.rollClass.attacker = this;
        
        //Math.floor(Math.random() * 10); //int 0 - 9
        var attackRoll = Math.floor(Math.random() * 20 + 1);
        var attackRoll2 = Math.floor(Math.random() * 20 + 1);
        
        if (this.Vantage == 1) {
            attackRoll = Math.max(attackRoll, attackRoll2);
        }
        else if (this.Vantage == -1) {
            attackRoll = Math.min(attackRoll, attackRoll2);
        }

        if (attackRoll == 1) {
            this.rollClass.hitRoll = 1;
            return 1;
        }
        if (attackRoll == 20) {
            this.rollClass.hitRoll = "crit";
            return "crit";
        }
        
        this.rollClass.hitRoll = attackRoll + parseInt(this.EquipWeapon.BonusToHit);
        return this.rollClass.hitRoll;
    }
    
    // Make a strike using equip weapon
    dealDamage() {       
        var damageTotal = 0;
        for(var i=0; i < this.EquipWeapon.NumDice; i++) {
            damageTotal = damageTotal + Math.floor(Math.random() * this.EquipWeapon.DamageDie + 1); // 1 - maxdmg
        }
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg;
        if (damageTotal < 0) { damageTotal = 0 }
        this.rollClass.damageRoll = damageTotal;
        this.rollClass.damageDie = this.EquipWeapon.DamageDie;
        this.rollClass.damageType = this.EquipWeapon.DamageType;
        return this.rollClass;
    }
        
    // Crit using equip weapon!
     dealCrit() {
        var damageTotal = 0;
        for(var i=0; i < this.EquipWeapon.NumDice*2; i++) {
            damageTotal = damageTotal + Math.floor(Math.random() * this.EquipWeapon.DamageDie + 1); // 1 - maxdmg
        }
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg;
        if (damageTotal < 0) { damageTotal = 0 }
        this.rollClass.damageRoll = damageTotal;
        this.rollClass.damageDie = this.EquipWeapon.DamageDie;
        this.rollClass.damageType = this.EquipWeapon.DamageType;         
        this.rollClass.crit = true;
        return this.rollClass;
    }
}
