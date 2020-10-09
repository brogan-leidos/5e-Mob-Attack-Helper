import Weapon from "./Weapon.js"
import DamageRoll from './DamageRoll.js'

export default class Mob {
    constructor(name= "", icon= "", weapon=null, vantage=0, mobname="default", number=-1) {
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
    this.isMelee = false;
    this.Name = name;
    this.Icon = icon;        
    this.MobName = mobname;
    this.Number = number;
        
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
    dealDamage() {       
        for (var i=0; i < this.EquipWeapon.length; i++) {
            var damageTotal = 0; 
            if (this.EquipWeapon[i][0] == "Weapon" || this.EquipWeapon[i][0] == "Extra Damage") {
                var weaponBreakdown = this.parseWeapon(this.EquipWeapon[i][1]);                
                damageTotal += weaponBreakdown["totalDamage"];
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
        for (var i=0; i < this.EquipWeapon.length; i++) {
            var damageTotal = 0; 
            if (this.EquipWeapon[i][0] == "Weapon" || this.EquipWeapon[i][0] == "Extra Damage") {
                var weaponBreakdown = this.parseWeapon(this.EquipWeapon[i][1], true);
                damageTotal += weaponBreakdown["totalDamage"];
                if (damageTotal < 0) { damageTotal = 0; }
                this.rollClass.damageResults.push([damageTotal, weaponBreakdown["damageType"]]);
            }
            else if (this.EquipWeapon[i][0] == "DC") {
                break;
            }
        }
        this.rollClass.crit = true;
        this.rollClass.message += `Crit! `;
        return this.rollClass;
    }
  
    purgeDamageResults() {
        this.rollClass.damageResults = [];
    }
    
    // Used to quickly roll for DC damage
    rollDamageForWeapon(weaponBreakdown, halfDamage=false){
        damageTotal = weaponBreakdown["totalDamage"];
        if (damageTotal < 0) { damageTotal = 0; }
        if (halfDamage) {
            damageTotal = Math.floor(damageTotal / 2);
        }
        this.rollClass.damageResults.push([damageTotal, weaponBreakdown["damageType"], halfDamage]);
        return this.rollClass;
    }
    
    parseWeapon(weaponString, isCrit=false) {
        var parseResult = {};        
        var damageType = "Unknown";
        var multiplier = isCrit ? 2 : 1;
        
        // Find the damage type first
        var typeIndex = weaponString.lastIndexOf(weaponString.match(/[\d,' ']/g).pop());
        damageType = weaponString.slice(typeIndex+1);
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
//             var blockBeginIndex = weaponString.lastIndexOf(weaponString.match(/[+,\-,' ']|^./g).pop(), dIndex);  
            var blockEndIndex = tempEndIndexSearch.search(/[+,\-,' ']|.$/) + dIndex;
            
            if (blockBeginIndex == -1) {
                blockBeginIndex = 0;
            }
            if (blockEndIndex == -1) {
                blockEndIndex = weaponString.length;
            }
            
            var beginOffset = blockBeginIndex == 0 ? 0 : blockBeginIndex + 1;
            
            var numDice = +weaponString.slice(beginOffset, dIndex)
            var damageDie = +weaponString.slice(dIndex + 1, blockEndIndex)
            
            var rollResult = 0;
            
            for(var i=0; i < numDice*multiplier; i++) {
                rollResult += Math.floor(Math.random() * damageDie + 1); // 1 - maxdmg
            }
            
            weaponString = `${weaponString.slice(0,beginOffset)}${rollResult}${weaponString.slice(blockEndIndex)}`;            
        }
        
        parseResult["totalDamage"] = eval(weaponString);
        parseResult["damageType"] = damageType;
        
        return parseResult;
        
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
                return [this.EquipWeapon[i][1], this.EquipWeapon[i][2]];
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
                    this.rollClass = this.rollDamageForWeapon(this.parseWeapon(this.EquipWeapon[i][1]));
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
                if (this.EquipWeapon[i][0] == "Damage (1/2 on save)") {
                    this.rollClass = this.rollDamageForWeapon(this.parseWeapon(this.EquipWeapon[i][1]), true);
                }
            }
        }
        return this.rollClass;
    }
    
}
