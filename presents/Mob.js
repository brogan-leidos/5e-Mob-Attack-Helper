import Weapon from "./Weapon"
import DamageRoll from './DamageRoll'

class Mob {
    constructor() {
    this.AC = 0;
    this.Health = 0;
    this.Str = 0;
    this.Dex = 0; 
    this.Con = 0; 
    this.Int = 0;
    this.Wis = 0;
    this.Chr = 0;
    this.Weapons = [];
    this.EquipWeapon = null;
    this.Icon = "⚫";
    }
    
    
    // Make an attack roll, modify by equip weapon
    makeAttack() {
        this.rollClass.attacker = this
        
        //Math.floor(Math.random() * 10); //int 0 - 9
        var attackRoll = Math.floor(Math.random() * 20 + 1);
        if (attackRoll == 1) {
            this.rollClass.hitRoll = 1
            return 1
        }
        if (attackRoll == 20) {
            this.rollClass.hitRoll = "crit"
            return "crit"
        }
        
        this.rollClass.hitRoll = attackRoll + this.EquipWeapon.BonusToHit
        return this.rollClass.hitRoll
    }
    
    // Make a strike using equip weapon
    dealDamage() {
        var splitString = this.EquipWeapon.DamageDie.split("d")
        var numAttacks = splitString[0]
        var maxDamage = splitString[1]
        
        var damageTotal = 0
        for(var i=0; i < numAttacks; i++) {
            damageTotal = damageTotal + Math.floor(Math.random() * maxDamage + 1) // 1 - maxdmg
        }
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg
        this.rollClass.damageRoll = damageTotal
        this.rollClass.damageDie = this.EquipWeapon.DamageDie
        return this.rollClass
    }
        
    // Crit using equip weapon!
    function dealCrit(self): any {
        var splitString = this.EquipWeapon.DamageDie.split("d")
        var numAttacks = splitString[0]
        var maxDamage = splitString[1]
        
        var damageTotal = 0
        for(var i=0; i < numAttacks*2; i++) {
            damageTotal = damageTotal + Math.floor(Math.random() * maxDamage + 1) // 1 - maxdmg
        }
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg
        this.rollClass.damageRoll = damageTotal
        this.rollClass.damageDie = this.EquipWeapon.DamageDie
        this.rollClass.crit = true
        return this.rollClass
    }
}
