import * from "./Weapon"
import * from './DamageRoll'

class Mob {
    var AC = 0;
    var Health = 0;
    var Str, Dex, Con, Int, Wis, Chr;
    var Weapons = [];
    var EquipWeapon;
    var Icon = "⚫";
    
    // Make an attack roll, modify by equip weapon
    makeAttack() {
        this.rollClass.attacker = this
        
        //Math.floor(Math.random() * 10); //int 0 - 9
        const attackRoll = Math.floor(Math.random() * 20 + 1);
        if attackRoll == 1:
            this.rollClass.hitRoll = 1
            return 1
        if attackRoll == 20:
            this.rollClass.hitRoll = "crit"
            return "crit"
        
        this.rollClass.hitRoll = attackRoll + this.EquipWeapon.BonusToHit
        return this.rollClass.hitRoll
    }
    
    // Make a strike using equip weapon
    dealDamage(self) {
        splitString = this.EquipWeapon.DamageDie.split("d")
        numAttacks = int(splitString[0])
        maxDamage = int(splitString[1])
        
        damageTotal = 0
        for i in range(0, numAttacks):
            damageTotal = damageTotal + random.randint(1, maxDamage)
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg
        this.rollClass.damageRoll = damageTotal
        this.rollClass.damageDie = this.EquipWeapon.DamageDie
        return this.rollClass
    }
        
    // Crit using equip weapon!
    function dealCrit(self): any {
        splitString = this.EquipWeapon.DamageDie.split("d")
        numAttacks = int(splitString[0])
        maxDamage = int(splitString[1])
        
        damageTotal = 0
        for i in range(0, numAttacks*2):
            damageTotal = damageTotal + random.randint(1, maxDamage)
        damageTotal = damageTotal + this.EquipWeapon.BonusToDmg
        
        this.rollClass.damageRoll = damageTotal
        this.rollClass.damageDie = this.EquipWeapon.DamageDie
        this.rollClass.crit = True
        return self.rollClass
    }
}
