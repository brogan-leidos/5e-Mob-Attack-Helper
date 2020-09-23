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
    this.EquipWeapon = weapon; // An array of modifiers
                               // EX: [["ToHit", 3], ["Weapon","1d6 + 3 slashing"], ["DC", 10, "Str"], ["Condition", "Knock Prone"]]
        
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
        
        this.rollClass.hitRoll = attackRoll + parseInt(this.EquipWeapon[0][1]);
        return this.rollClass.hitRoll;
    }
    
    // Make a strike using equip weapon
    dealDamage() {       
        var damageTotal = 0;        
        for (var i=0; i < this.EquipWeapon.length; i++) {
            if (this.EquipWeapon[i][0] == "Weapon" || this.EquipWeapon[i][0] == "Extra Damage") {
                var weaponBreakdown = this.parseWeapon(this.EquipWeapon[i][1]);
                for(var j=0; j < weaponBreakdown["numDice"]; j++) {
                    damageTotal += Math.floor(Math.random() * weaponBreakdown["damageDie"] + 1); // 1 - maxdmg
                }
                damageTotal += weaponBreakdown["bonusDmg"];
                if (damageTotal < 0) { damageTotal = 0; }
                this.rollClass.damageResults.push([damageTotal, weaponBreakdown["damageType"]]);
            }
            else if (this.EquipWeapon[i][0] == "DC") {
                break;
            }
        }                       
        return this.rollClass;
    }
        
    // Crit using equip weapon!
     dealCrit() {
        var damageTotal = 0;        
        for (var i=0; i < this.EquipWeapon.length; i++) {
            if (this.EquipWeapon[i][0] == "Weapon" || this.EquipWeapon[i][0] == "Extra Damage") {
                var weaponBreakdown = this.parseWeapon(this.EquipWeapon[i][1]);
                for(var j=0; j < weaponBreakdown["numDice"]*2; j++) {
                    damageTotal += Math.floor(Math.random() * weaponBreakdown["damageDie"] + 1); // 1 - maxdmg
                }
                damageTotal += weaponBreakdown["bonusDmg"];
                if (damageTotal < 0) { damageTotal = 0; }
                this.rollClass.damageResults.push([damageTotal, weaponBreakdown["damageType"]]);
            }
            else if (this.EquipWeapon[i][0] == "DC") {
                break;
            }
        }
        this.rollClass.crit = true;
        return this.rollClass;
    }
  
    rollDamageForWeapon(weaponBreakdown){
        var damageTotal = 0;
        for(var j=0; j < weaponBreakdown["numDice"]; j++) {
            damageTotal += Math.floor(Math.random() * weaponBreakdown["damageDie"] + 1); // 1 - maxdmg
        }
        damageTotal += weaponBreakdown["bonusDmg"];
        if (damageTotal < 0) { damageTotal = 0; }
        this.rollClass.damageResults.push([damageTotal, weaponBreakdown["damageType"]]);
        return this.rollClass;
    }
    
    // Parse the weapon string, turn it into a weapon object we can send to the mob attack method
    parseWeapon(weaponString) {
    // Create a weapon object out of the data. Sample data: 1d6 + 3 slashing
        var dSplitIndex = weaponString.indexOf("d");
        if (dSplitIndex == -1) {
            return false;
        }
        var numDice = parseInt(weaponString.substr(0, dSplitIndex).trim());
        var splitWeapon = weaponString.substr(dSplitIndex + 1);

        splitWeapon = splitWeapon.split("+");
        var flipBit = 1;
        if (splitWeapon.length == 1) { // no result found for +, try -
            splitWeapon = splitWeapon[0].split("-");       
            if (splitWeapon.length == 1) {
                return false;
            }
            flipBit = -1;
        }   
        var damageDie = parseInt(splitWeapon[0].trim());
        splitWeapon = this.combineEnds(splitWeapon);

        splitWeapon = splitWeapon.trim().split(" ");
        var bonusDmg = parseInt(splitWeapon[0].trim()) * flipBit;

        if (splitWeapon.length > 1) {
            var damageType = splitWeapon[1].trim();
        }
    
        return {"numDice": numDice, "damageDie":damageDie, "bonusDmg":bonusDmg, "damageType":damageType};     
    }
    
    combineEnds(stringArray) {
        if (stringArray.length == 1) {
            return;
        }
        var combined = "";
        for (var i=1; i < stringArray.length; i++) {
            combined += stringArray[i];
        }
        return combined;
    }
    
    checkIfHasDc() {
        for (var i=0; i < this.EquipWeapon.length; i++) {
            if (this.EquipWeapon[i][0] == "DC") {
                return this.EquipWeapon[i][1];
            }
        }
        return false;
    }
    
    failDc() {
        var afterDc = false;
        var ret = [];
        for (var i=0; i < this.EquipWeapon.length; i++) {
            if (this.EquipWeapon[i][0] == "DC") {
                afterDc = true;
            }
            else if (afterDc) {
                if (this.EquipWeapon[i][0].includes("Damage")) {
                    this.rollClass = this.rollDamageForWeapon(parseWeapon(this.EquipWeapon[i][1]));
                }
                else if (this.EquipWeapon[i][0] == "Condition") {
                    ret.push(["Condition", this.EquipWeapon[i][1]]);
                }
            }
        }
        ret.push(["Roll Class", this.rollClass]);
        return ret;
    }
    
    succeedDc() {
        var afterDc = false;
        var ret = [];
        for (var i=0; i < this.EquipWeapon.length; i++) {
            if (this.EquipWeapon[i][0] == "DC") {
                afterDc = true;
            }
            else if (afterDc) {
                if (this.EquipWeapon[i][0] == "Damage (1/2 on success)") {
                    this.rollClass = this.rollDamageForWeapon(parseWeapon(this.EquipWeapon[i][1]));
                }
            }
        }
        return this.rollClass;
    }
    
}
