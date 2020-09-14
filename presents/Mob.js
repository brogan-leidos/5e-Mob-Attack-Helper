import Weapon from "./Weapon.js"
import DamageRoll from './DamageRoll.js'

export default class Mob {
    constructor(name= "", icon= "", weapon=null, vantage=0, mobname="default", weapon2, partofcrit=false) {
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
    this.Weapon2 = weapon2;
    this.Weapon2PartOfCrit = partofcrit;
        
    this.Name = name;
    this.Icon = icon;
        
    this.MobName = mobname;
        
    this.rollClass = new DamageRoll();
    this.Vantage = vantage;

    
    
    }
    
    miss() {
        this.rollClass.missed = true;
        return this.rollClass;
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
        
        if (this.Weapon2) {
            damageTotal = 0;
            for(var i=0; i < this.Weapon2.NumDice; i++) {
                damageTotal = damageTotal + Math.floor(Math.random() * this.Weapon2.DamageDie + 1); // 1 - maxdmg
            }
            damageTotal = damageTotal + this.Weapon2.BonusToDmg;
            if (damageTotal < 0) { damageTotal = 0 }
            this.rollClass.damageRoll2 = damageTotal;
            this.rollClass.damageType2 = this.Weapon2.DamageType;        
        }
        
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
         
        if (this.Weapon2PartOfCrit) {
            damageTotal = 0;
            for(var i=0; i < this.Weapon2.NumDice*2; i++) {
                damageTotal = damageTotal + Math.floor(Math.random() * this.Weapon2.DamageDie + 1); // 1 - maxdmg
            }
            damageTotal = damageTotal + this.Weapon2.BonusToDmg;
            if (damageTotal < 0) { damageTotal = 0 }
            this.rollClass.damageRoll2 = damageTotal;
            this.rollClass.damageType2 = this.Weapon2.DamageType;         
        } else if (this.Weapon2) {
            damageTotal = 0;
            for(var i=0; i < this.Weapon2.NumDice; i++) {
                damageTotal = damageTotal + Math.floor(Math.random() * this.Weapon2.DamageDie + 1); // 1 - maxdmg
            }
            damageTotal = damageTotal + this.Weapon2.BonusToDmg;
            if (damageTotal < 0) { damageTotal = 0 }
            this.rollClass.damageRoll2 = damageTotal;
            this.rollClass.damageType2 = this.Weapon2.DamageType;  
        }
         
        return this.rollClass;
    }
}
