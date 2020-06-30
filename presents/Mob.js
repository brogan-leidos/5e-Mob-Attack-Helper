import Weapon from "./Weapon.js"
import DamageRoll from './DamageRoll.js'

export default class Mob {
    constructor(name= "", icon= "", weapon=null) {
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
        
    this.rollClass = new DamageRoll();
    
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
        var damageTotal = 0
        for(var i=0; i < this.EquipWeapon.NumDice; i++) {
            damageTotal = damageTotal + Math.floor(Math.random() * maxDamage + 1) // 1 - maxdmg
        }
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg
        this.rollClass.damageRoll = damageTotal
        this.rollClass.damageDie = this.EquipWeapon.DamageDie
        return this.rollClass
    }
        
    // Crit using equip weapon!
     dealCrit() {
        var damageTotal = 0
        for(var i=0; i < this.EquipWeapon.NumDice*2; i++) {
            damageTotal = damageTotal + Math.floor(Math.random() * maxDamage + 1) // 1 - maxdmg
        }
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg
        this.rollClass.damageRoll = damageTotal
        this.rollClass.damageDie = this.EquipWeapon.DamageDie
        this.rollClass.crit = true
        return this.rollClass
    }
}
