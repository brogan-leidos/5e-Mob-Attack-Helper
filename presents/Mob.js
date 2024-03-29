import Weapon from "./Weapon.js"
import DamageRoll from './DamageRoll.js'

export default class Mob {
    constructor(name= "", icon= "", weapon=null, vantage=0, mobname="default", number=-1, multiattack=false) {
        this.Weapons = [];
        this.EquipWeapon = weapon; // An array of modifiers
                                // EX: [["ToHit", 3], ["Weapon","1d6 + 3 slashing"], ["DC", 10, "Str"], ["Condition", "Knock Prone"]]
        this.Name = name;
        this.Icon = icon;        
        this.MobName = mobname;
        this.Number = number;
            
        this.rollClass = new DamageRoll();
        this.Vantage = vantage;

        this.Multiattack = multiattack;

    }
    
    miss() {
        this.rollClass.missed = true;
        return this.rollClass;
    }
    
    // Make an attack roll, modify by equip weapon
    makeAttack() {
        this.rollClass.attacker = this;
        
        //Math.floor(Math.random() * 10); //int 0 - 9
        this.rollClass.attackRoll1 = Math.floor(Math.random() * 20 + 1);
        this.rollClass.attackRoll2 = Math.floor(Math.random() * 20 + 1);
        var attackRoll = null;
        
        if (this.Vantage >= 1) {
            attackRoll = Math.max(this.rollClass.attackRoll1, this.rollClass.attackRoll2);
            this.rollClass.vantage = this.Vantage;
        }
        else if (this.Vantage <= -1) {
            attackRoll = Math.min(this.rollClass.attackRoll1, this.rollClass.attackRoll2);
            this.rollClass.vantage = this.Vantage;
        }
        else {
            attackRoll = this.rollClass.attackRoll1;
        }

        if (attackRoll == 1) {
            this.rollClass.crit = true;
            this.rollClass.missed = true;            
        }
        if (attackRoll == 20) {           
            this.rollClass.crit = true;            
        }
        
        this.rollClass.hitRoll = attackRoll + parseInt(this.EquipWeapon[0][1]);
        
        return this.rollClass;
    }
    
    // Make a strike using equip weapon
    dealDamage(isCrit=false) {       
        for (var i=0; i < this.EquipWeapon.length; i++) {
            var damageTotal = 0; 
            if (this.EquipWeapon[i][0] == "Weapon" || this.EquipWeapon[i][0] == "Extra Damage") {
                var weaponBreakdown = this.parseWeapon(this.EquipWeapon[i][1], isCrit);  
                
                if (weaponBreakdown["errorMessage"]) {
                    this.rollClass.error = true;
                    this.rollClass.message = weaponBreakdown["errorMessage"];
                    return this.rollClass;
                }
                
                damageTotal += weaponBreakdown["totalDamage"];
                if (damageTotal < 0) { damageTotal = 0; }
                this.rollClass.damageResults.push([damageTotal, weaponBreakdown["damageType"]]);
                this.rollClass.rollBreakdown.push(weaponBreakdown["weaponString"]);
            }
            else if (this.EquipWeapon[i][0] == "DC") {
                break;
            }
        }                       
        return this.rollClass;
    }
        
    // Crit using equip weapon!
    dealCrit() {               
        var ret = this.dealDamage(true)
        this.rollClass.crit = true;
        this.rollClass.message += `Crit! `;
        return this.rollClass;
    }
  
    purgeDamageResults() {
        this.rollClass.damageResults = [];
        this.rollClass.rollBreakdown = [];
    }
    
    // Used to quickly roll for DC damage
    rollDamageForWeapon(weaponBreakdown, halfDamage=false){
        var damageTotal = weaponBreakdown["totalDamage"];
        if (damageTotal < 0) { damageTotal = 0; }
        if (halfDamage) {
            damageTotal = Math.floor(damageTotal / 2);
            weaponBreakdown["weaponString"] = `${weaponBreakdown["weaponString"]} (1/2 on save)`;
        }
        this.rollClass.damageResults.push([damageTotal, weaponBreakdown["damageType"], halfDamage]);
        this.rollClass.rollBreakdown.push(weaponBreakdown["weaponString"]);
        return this.rollClass;
    }
    
    parseWeapon(weaponString, isCrit=false) {
        var parseResult = {};        
        var damageType = "Unknown";
        var multiplier = isCrit ? 2 : 1;
        
        try {
            // Find the damage type first
            var typeIndex = weaponString.lastIndexOf(weaponString.match(/\d/g).pop());
            damageType = weaponString.slice(typeIndex+1).trim();
            weaponString = weaponString.slice(0,typeIndex+1);
            
            var index = 0;
            while(true) {           
                var dIndex = weaponString.indexOf('d', index);
                if (dIndex == -1) {
                    break;
                }
                index = dIndex;
                var tempEndIndexSearch = weaponString.slice(dIndex);
                var backIndex = dIndex;
                var blockBeginIndex = -1;
                while(true) {
                    backIndex--;
                    if (backIndex == -1){
                        break;
                    }
                    if (weaponString[backIndex].search(/[+,\-,' ']/) != -1) {
                        blockBeginIndex = backIndex;
                        break;
                    }              
                }
                var blockEndIndex = tempEndIndexSearch.search(/[+,\-,' ']|.$/) + dIndex;
                
                if (blockBeginIndex == -1) {
                    blockBeginIndex = 0;
                }
                if (blockEndIndex == weaponString.length - 1) {
                    blockEndIndex = weaponString.length;
                }
                
                var beginOffset = blockBeginIndex == 0 ? 0 : blockBeginIndex + 1;
                
                var numDice = +weaponString.slice(beginOffset, dIndex)
                var damageDie = +weaponString.slice(dIndex + 1, blockEndIndex)
                
                var rollResult = "(";
                
                for(var i=0; i < numDice*multiplier; i++) {                    
                    if (i != 0) {
                        rollResult += " + ";
                    }
                    rollResult += Math.floor(Math.random() * damageDie + 1).toString(); // 1 - maxdmg                    
                }
                rollResult += ")";
                
                weaponString = `${weaponString.slice(0,beginOffset)}${rollResult}${weaponString.slice(blockEndIndex)}`;            
            }
            
            parseResult["totalDamage"] = eval(weaponString);
            parseResult["damageType"] = damageType;
            parseResult["weaponString"] = weaponString;
            
            return parseResult;
        } 
        catch (err) {
            return {"errorMessage":`Something went wrong when parsing an input under Name: ${this.Name}` };
        }
        
    }    
    
    checkIfHasDc() {
        for (var i=0; i < this.EquipWeapon.length; i++) {
            if (this.EquipWeapon[i][0] == "DC") {
                return [this.EquipWeapon[i][1], this.EquipWeapon[i][2]];
            }
        }
        return false;
    }
    
    getNonDcConditions() {
        var ret = [];
        for (var i=0; i < this.EquipWeapon.length; i++) {                        
            if (this.EquipWeapon[i][0] == "Condition") {
                ret.push(this.EquipWeapon[i][1]);
            }            
            else if (this.EquipWeapon[i][0] == "DC") {
                break;
            }
        }
        return ret;
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
                    var weaponBreakdown = this.parseWeapon(this.EquipWeapon[i][1]);
                    if (weaponBreakdown["errorMessage"]) {
                        this.rollClass.error = true;
                        this.rollClass.message = weaponBreakdown["errorMessage"];
                    }
                    else {
                        this.rollClass = this.rollDamageForWeapon(weaponBreakdown);
                    }
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
        for (var i=0; i < this.EquipWeapon.length; i++) {
            if (this.EquipWeapon[i][0] == "DC") {
                afterDc = true;
            }
            else if (afterDc) {
                if (this.EquipWeapon[i][0] == "Damage (1/2 on save)") {
                    var weaponBreakdown = this.parseWeapon(this.EquipWeapon[i][1]);
                    if (weaponBreakdown["errorMessage"]) {
                        this.rollClass.error = true;
                        this.rollClass.message = weaponBreakdown["errorMessage"];
                    } 
                    else {
                        this.rollClass = this.rollDamageForWeapon(weaponBreakdown, true);
                    }
                }
            }
        }
        return this.rollClass;
    }

    assignPropertiesFromMob(mobToPullFrom) {
        this.Weapons = mobToPullFrom.Weapons;
        this.EquipWeapon = mobToPullFrom.EquipWeapon; // An array of modifiers
                                // EX: [["ToHit", 3], ["Weapon","1d6 + 3 slashing"], ["DC", 10, "Str"], ["Condition", "Knock Prone"]]
        this.Name = mobToPullFrom.Name;
        this.Icon = mobToPullFrom.Icon;        
        this.MobName = mobToPullFrom.MobName;
        this.Number = mobToPullFrom.Number;
            
        this.Vantage = mobToPullFrom.Vantage;

        this.Multiattack = mobToPullFrom.Multiattack;
    }
    
}
