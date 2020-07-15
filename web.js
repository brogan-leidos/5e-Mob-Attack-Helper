import Mob from './presents/Mob.js'
import {mobBlock} from './templates/Mob-Block.js'
import {weaponsToHtml} from './templates/utils.js'
import Weapon from './presents/Weapon.js'
import DamageRoll from './presents/DamageRoll.js'
import Skeleton from './presents/Skeleton.js'
import Zombie from './presents/Zombie.js'
import Ghoul from './presents/Ghoul.js'
import Wolf from './presents/Wolf.js'
import ObjectTiny from './presents/ObjectTiny.js'
import ObjectSmall from './presents/ObjectSmall.js'
import ObjectMedium from './presents/ObjectMedium.js'
import ObjectLarge from './presents/ObjectLarge.js'
import ObjectHuge from './presents/ObjectHuge.js'


var mobIncrement = 0;
var blockArray = [];

export default () => {        
    var mobBlockArea = document.getElementById('mobBlockArea');
    var infoArea = document.getElementById('infoArea'); // Debug info and roll info
    
    document.getElementById('addTiny').addEventListener('click', () => {
        createPresent("ObjectTiny");
    });
    document.getElementById('addSmall').addEventListener('click', () => {
        createPresent("ObjectSmall");
    });
    document.getElementById('addMedium').addEventListener('click', () => {
        createPresent("ObjectMedium");
    });
    document.getElementById('addLarge').addEventListener('click', () => {
        createPresent("ObjectLarge");
    });
    document.getElementById('addHuge').addEventListener('click', () => {
        createPresent("ObjectHuge");
    });        
    document.getElementById('addBlank').addEventListener('click', () => {
        createPresent("");
    });    
    document.getElementById('addSkeleton').addEventListener('click', () => {
        createPresent("Skeleton");
    });
    document.getElementById('addZombie').addEventListener('click', () => {
        createPresent("Zombie");
    });    
    document.getElementById('addGhoul').addEventListener('click', () => {
        createPresent("Ghoul");
    });    
    document.getElementById('addWolf').addEventListener('click', () => {
        createPresent("Wolf");
    });
    
    document.getElementById('targetAc').addEventListener('change', (newAc) => {        
        if (newAc.target.value <= 0) {
            alert("Will run in discovery mode");   
        }
        
    });
    document.getElementById('goButton').addEventListener('click', () => {        
        launchAttack();
    });       
};

function deleteMob(mobTag) {
    blockArray = blockArray.filter(function(a) { return (a != mobTag) } );
    document.getElementById(mobTag).remove();    
}

function toggleMob(mobTag) {
    var enabled = document.getElementById(mobTag + "-Enabled").checked;
    if (enabled) {
        document.getElementById(mobTag).firstElementChild.style.backgroundColor = "#f9f9eb";
    } else {
        document.getElementById(mobTag).firstElementChild.style.backgroundColor = "grey";
    }
}

function createPresent(presentName) {
   // Create a unique ID for this new mob
   var mobTag = "Mob" + mobIncrement.toString();
   blockArray.push(mobTag);
   mobIncrement++;
    
   var newMob;
   var appendBlock = mobBlock();

   if (presentName == "Skeleton") {
      newMob = new Skeleton(); 
   }
   else if (presentName == "Zombie") {
      newMob = new Zombie(); 
   }
   else if (presentName == "Ghoul") {
      newMob = new Ghoul(); 
   }
   else if (presentName == "Wolf") {
      newMob = new Wolf(); 
   }
   else if (presentName == "ObjectTiny") {
      newMob = new ObjectTiny(); 
   }
   else if (presentName == "ObjectSmall") {
      newMob = new ObjectSmall(); 
   }
   else if (presentName == "ObjectMedium") {
      newMob = new ObjectMedium(); 
   }
   else if (presentName == "ObjectLarge") {
      newMob = new ObjectLarge(); 
   }
   else if (presentName == "ObjectHuge") {
      newMob = new ObjectHuge(); 
   }
   else {
       appendBlock = appendBlock.replace(/FILLER-BLOCK/g, mobTag);
       appendBlock = appendBlock.replace("FILLER-NAME", mobTag);
       
       appendBlock = appendBlock.replace("FILLER-WEAPON", "1d6 + 3");
       appendBlock = appendBlock.replace("FILLER-TOHIT", "0");
       
       mobBlockArea.insertAdjacentHTML('beforeend', appendBlock);
       
       document.getElementById(mobTag + "-Weapon-Select").remove();
       
       var deleteButton = document.getElementById(mobTag + "-Delete")  
       deleteButton.addEventListener('click', () => {        
           deleteMob(mobTag);
       });
       return;
   }
    
    var additionalOptions = weaponsToHtml(newMob.Weapons);
    appendBlock = appendBlock.replace("ADDITIONAL-WEAPONS", additionalOptions);
    var equipName = "\"" + newMob.EquipWeapon.Name + "\"";
    appendBlock = appendBlock.replace(equipName, equipName.concat(" selected"));
    
    appendBlock = appendBlock.replace(/FILLER-BLOCK/g, mobTag);    
    appendBlock = appendBlock.replace("FILLER-NAME", newMob.Name);
    appendBlock = appendBlock.replace(newMob.Icon, newMob.Icon.concat(" selected"));
    appendBlock = appendBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.NumDice.toString() + "d" + newMob.EquipWeapon.DamageDie.toString().concat(" + ").concat(newMob.EquipWeapon.BonusToDmg.toString()).concat(" " + newMob.EquipWeapon.DamageType));
    appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);    

    mobBlockArea.insertAdjacentHTML('beforeend', appendBlock);
    
    var deleteButton = document.getElementById(mobTag + "-Delete")  
    deleteButton.addEventListener('click', () => {        
        deleteMob(mobTag);
    });
    
    var toggleButton = document.getElementById(mobTag + "-Enabled")  
    toggleButton.addEventListener('click', () => {        
        toggleMob(mobTag);
    });
    
    var weaponSelect = document.getElementById(mobTag + "-Weapon-Select")
    weaponSelect.addEventListener('change', (temp) => {
        changeMobWeapon(mobTag, temp.target.value);        
    });
    
    return; 
}

function changeMobWeapon (mobTag, newValue) {
    var toHit = parseInt(newValue.split("ToHit:")[1].split("Weapon:")[0]);
    var weapon = newValue.split("Weapon:")[1];
    document.getElementById(mobTag + "-ToHit").value = toHit;
    document.getElementById(mobTag + "-Weapon").value = weapon;
}

function combineEnds(stringArray) {
    if (stringArray.length == 1) {
        return;
    }
    var combined = "";
    for (var i=1; i < stringArray.length; i++) {
        combined += stringArray[i];
    }
    return combined;
}

// Parse the weapon string, turn it into a weapon object we can send to the mob attack method
function parseWeapon(weapon, hitbonus) {
    // Create a weapon object out of the data. Sample data: 1d6 + 3 slashing
    var dSplitIndex = weapon.indexOf("d");
    if (dSplitIndex == -1) {
        // Something something error check   
    }
    var numAttacks = parseInt(weapon.substr(0, dSplitIndex).trim());
    var splitWeapon = weapon.substr(dSplitIndex + 1);
    
    splitWeapon = splitWeapon.split("+");
    var flipBit = 1;
    if (splitWeapon.length == 1) { // no result found for +, try -
        splitWeapon = splitWeapon[0].split("-");       
        if (splitWeapon.length == 1) {
            // Something something error check
        }
        flipBit = -1;
    }   
    var damageDie = parseInt(splitWeapon[0].trim());
    splitWeapon = combineEnds(splitWeapon);
    
    splitWeapon = splitWeapon.trim().split(" ");
    var bonusDmg = parseInt(splitWeapon[0].trim()) * flipBit;
    
    if (splitWeapon.length > 1) {
        var damageType = splitWeapon[1].trim();
    }
    
    return new Weapon("FILLER NAME", numAttacks, damageDie, damageType, hitbonus, bonusDmg);       
}

function launchAttack() {
    var mobArray = []; // 2d arrays: Block type, attacks of that block
    var rollArray = [];
    var numCrits = 0;
    var numBlocks = blockArray.length;    
    
    // Activate the info box
    document.getElementById("infoAreaDiv").style.display = "block";
    
    if (numBlocks == 0){
        infoArea.innerHTML = "There are no mobs available to attack with!";
        return;
    }
           
    // Go though each creature block, spawn a number of mobs with those stats
    for(var i=0;i < numBlocks;i++) {
        //Name, Icon, to hit, weapon, number
        if (!document.getElementById(blockArray[i].concat("-Enabled")).checked) {
            continue; // If the box is not checked, skip that mob block
        }        
        
        var name = document.getElementById(blockArray[i].concat("-Name")).value;
        var icon = document.getElementById(blockArray[i].concat("-Icon"));
        icon = icon.options[icon.selectedIndex].innerHTML;
        var tohit = document.getElementById(blockArray[i].concat("-ToHit")).value;
        var weapon = document.getElementById(blockArray[i].concat("-Weapon")).value;
        var number = document.getElementById(blockArray[i].concat("-Number")).value;        
        var advantage = document.getElementById(blockArray[i].concat("-Adv")).checked;
        var disadvantage = document.getElementById(blockArray[i].concat("-Dis")).checked * -1;
        
        weapon = parseWeapon(weapon, tohit);
        
        var vantage = advantage + disadvantage;
        
        mobArray[i] = new Array();
        for(var j=0; j < number; j++) {
            mobArray[i].push(new Mob(name, icon, weapon, vantage))
        }                
    }
    
    // Having spawned our army, let them all launch attacks. Record the attack if it lands
    var targetAc = document.getElementById('targetAc').value;
    
    // discovery is for when we dont know the target AC, it will step the attacks sequentially until we figure it out
    var discoveryModeFlag = false;
    if (targetAc <= 0) {
        discoveryModeFlag = true;
        var minAc = 0;
    }
    
    for (var block=0; block < mobArray.length;block++) {
        rollArray[block] = new Array();
        for (var i=0; i < mobArray[block].length; i++) {
            var attackRoll = mobArray[block][i].makeAttack();
            if (attackRoll == "crit") {
                rollArray[block].push(mobArray[block][i].dealCrit());
                numCrits = numCrits + 1;
            }
            else if (discoveryModeFlag) {
                if (attackRoll > minAc) {
                    var response = confirm(attackRoll);
                    if (response) {
                        rollArray[block].push(mobArray[block][i].dealDamage());
                        minAc = attackRoll;
                    }
                }
                else {
                    rollArray[block].push(mobArray[block][i].dealDamage());
                }                

            }
            else if (attackRoll >= targetAc) {                
                rollArray[block].push(mobArray[block][i].dealDamage());
            }          
        }
    }
    
    // Take a sum of the attacks that landed. Boom, dead enemy, maybe.    
    var totalDamage = 0;
    var totalHits = 0;
    var infoAppend = "";
    
    // Go through each block, take a sum of damage and # of hits
    for (var block=0; block < rollArray.length; block++) {
        if (rollArray[block].length == 0) {
            continue; // This means no one in the block landed a hit. Beep Boop Sad Toot
        }
        totalHits += rollArray[block].length;
        var attacker = rollArray[block][0].attacker;
        var numOfBlockCrits = 0;
        var blockTotalDamage = 0;
        
        // Go through each unit in the block and tally up that damage
        for (var i=0; i < rollArray[block].length; i++) {
            totalDamage += rollArray[block][i].damageRoll;
            blockTotalDamage += rollArray[block][i].damageRoll;
            if (rollArray[block][i].crit) {
                numOfBlockCrits += 1;
            }

        }
        infoAppend += attacker.Icon + " " + attacker.Name + " : " + rollArray[block].length + " hits";
        if (numOfBlockCrits > 0) {
            infoAppend += " (🌟" + numOfBlockCrits.toString() + " crits)";
        }
        infoAppend += " : " + blockTotalDamage.toString() + " total " + rollArray[block][0].damageType + " damage";
        infoAppend += "<br>";
    }
    
    var header =  totalHits.toString() + " attacks landed <br>";    
    if (numCrits > 0) {
        header += "  <b>" + numCrits + " crits! </b><br>";
    }
    header += totalDamage.toString().concat(" total damage delt<br>")
    header += "-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>"
    infoAppend = header + infoAppend;
    infoArea.innerHTML = infoAppend;
        
}
