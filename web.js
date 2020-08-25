import Mob from './presents/Mob.js'
import { mobBlock } from './templates/Mob-Block.js'
import { weaponsToHtml } from './templates/utils.js'
import { discoveryTemplate } from './templates/Discovery-Template.js'
import { Weapon, DamageRoll, Skeleton, Zombie, Ghoul, Wolf, ObjectTiny, ObjectSmall, ObjectMedium, ObjectLarge, ObjectHuge,
         Dretch, Mane, Berserk } from './presents/index.js'

var mobBlockDefaultColor = "#f9f9eb";
var mobBlockDisableColor = "grey";
var mobBlockAdvantageColor = "#efffe6";
var mobBlockDisadvantageColor = "#ffede6";


var mobIncrement = 0; // Used to generate unique names for each mob block
var blockArray = []; // Used globally as a reference to what mob blocks exist on the page

var mobReference = [new Skeleton(), new Zombie(), new Ghoul(), new Wolf(), 
                    new ObjectTiny(), new ObjectSmall(), new ObjectMedium(), new ObjectLarge(), new ObjectHuge(),
                    new Dretch(), new Mane(), new Berserk()]

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
    document.getElementById('addMane').addEventListener('click', () => {
        createPresent("Mane");
    });
    document.getElementById('addDretch').addEventListener('click', () => {
        createPresent("Dretch");
    });
    document.getElementById('addBerserk').addEventListener('click', () => {
        createPresent("Berserk");
    });
    
    document.getElementById('targetAc').addEventListener('change', (newAc) => {
        discoveryCheck(newAc);        
    });
    document.getElementById('goButton').addEventListener('click', () => {        
        launchAttack();
    });       
};

// Checks if the target ac is below zero, if so enable discovery mode
function discoveryCheck(newAc) {
    if (newAc.target.value <= 0) {
        document.getElementById('discoveryTag').style.display = "inline";
    }
    else {
        document.getElementById('discoveryTag').style.display = "none";
    }
}

function deleteMob(mobTag) {
    blockArray = blockArray.filter(function(a) { return (a != mobTag) } );
    document.getElementById(mobTag).remove();    
}

function toggleMob(mobTag) {
    var enabled = document.getElementById(mobTag + "-Enabled").checked;
    if (enabled) {
        document.getElementById(mobTag).firstElementChild.style.backgroundColor = mobBlockDefaultColor;
    } else {
        document.getElementById(mobTag).firstElementChild.style.backgroundColor = mobBlockDisableColor;
    }
}

function createPresent(presentName) {
   // Create a unique ID for this new mob
   var mobTag = "Mob" + mobIncrement.toString();
   blockArray.push(mobTag);
   mobIncrement++;
    
   var newMob;
   var appendBlock = mobBlock();
    
   var filtered = mobReference.filter(a => a.Name == presentName);
   if (filtered.length == 0) {     
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
    newMob = filtered[0];
    
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
    
    document.getElementById(mobTag + "-Delete").addEventListener('click', () => {        
        deleteMob(mobTag);
    });
    
    document.getElementById(mobTag + "-Enabled").addEventListener('click', () => {        
        toggleMob(mobTag);
    });
    
    document.getElementById(mobTag + "-Weapon-Select").addEventListener('change', (temp) => {
        changeMobWeapon(mobTag, temp.target.value);        
    });
    
    document.getElementById(mobTag + "-Adv").addEventListener('change', (e) => {
        changeVantage(mobTag, e.target.value);        
    });
    document.getElementById(mobTag + "-Dis").addEventListener('change', (e) => {
        changeVantage(mobTag, e.target.value);        
    });
    
    return; 
}

function changeMobWeapon (mobTag, newValue) {
    var toHit = parseInt(newValue.split("ToHit:")[1].split("Weapon:")[0]);
    var weapon = newValue.split("Weapon:")[1];
    document.getElementById(mobTag + "-ToHit").value = toHit;
    document.getElementById(mobTag + "-Weapon").value = weapon;
}

function changeVantage(mobTag, newValue) {
    var adv = document.getElementById(mobTag + "-Adv").checked;
    var dis = document.getElementById(mobTag + "-Dis").checked;
    var mob = document.getElementById(mobTag);
    
    if (adv && !dis) {
        mob.firstElementChild.style.backgroundColor = mobBlockAdvantageColor;
    }
    else if (!adv && dis) {
        mob.firstElementChild.style.backgroundColor = mobBlockDisadvantageColor;
    }
    else {
        mob.firstElementChild.style.backgroundColor = mobBlockDefaultColor;
    }
   
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

function toggleDetails(event, rollArray) {
    var mobTag = event.target.id.split("-")[0];
    var detailElement = document.getElementById(mobTag + "-Details");
    if (detailElement == null) {
        var detailAppend = `<div id=${mobTag}-Details>`;

        for (var i=0; i < rollArray.length; i++) {
            for (var j=0; j < rollArray[i].length; j++) {
                if (rollArray[i][j].attacker.MobName == mobTag) {
                    if (rollArray[i][j].hitRoll == "crit") {
                        detailAppend += `<span style="margin-left:15px; color:#b59800"> [${rollArray[i][j].hitRoll}] ⚔${rollArray[i][j].damageRoll} </span><br>`;
                    }
                    else {
                        detailAppend += `<span style="margin-left:15px"> [${rollArray[i][j].hitRoll}] ⚔${rollArray[i][j].damageRoll} </span><br>`;
                    }
                }
            }
        }   
        detailAppend += "</div>";
        var tag = mobTag + "-Result";

        document.getElementById(tag).insertAdjacentHTML('beforeend', detailAppend);
    }
    else {
        detailElement.remove();
    }
}

async function launchAttack() {
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
            mobArray[i].push(new Mob(name, icon, weapon, vantage, blockArray[i]))
        }                
    }
    
    // Having spawned our army, let them all launch attacks. Record the attack if it lands
    var targetAc = document.getElementById('targetAc').value;
    
    // discovery is for when we dont know the target AC, it will step the attacks sequentially until we figure it out
    var discoveryModeFlag = false;
    if (targetAc <= 0) {
        discoveryModeFlag = true;
        var minAc = -1;
        var lowerCap = -1
    }
    
    for (var block=0; block < mobArray.length;block++) {
        rollArray[block] = new Array();
        for (var i=0; i < mobArray[block].length; i++) {
            var attackRoll = mobArray[block][i].makeAttack();
            if (attackRoll == "crit") {
                rollArray[block].push(mobArray[block][i].dealCrit());
                numCrits = numCrits + 1;
            }            
            else if (discoveryModeFlag) { // Discovery mode intercepts the natural flow of things here             
              if (attackRoll <= lowerCap) {
                  continue;
              } 
              if (attackRoll < minAc || minAc == -1) {
                  var response = await discoveryStep(attackRoll);
                  if (response) {
                      rollArray[block].push(mobArray[block][i].dealDamage());
                      minAc = attackRoll;
                  }
                  else {
                      if (attackRoll > lowerCap) {
                          lowerCap = attackRoll;
                      }
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
  
    if (discoveryModeFlag) { //Cleanup after all rolls have been processed
      document.getElementById("discoveryArea").innerHTML = "";
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
        infoAppend += `<span class="mobHeader" id="${attacker.MobName}-Result">` + attacker.Icon + " " + attacker.Name + " : " + rollArray[block].length + " hits";
        if (numOfBlockCrits > 0) {
            infoAppend += " (🌟" + numOfBlockCrits.toString() + " crits)";
        }
        infoAppend += " : " + blockTotalDamage.toString() + " total " + rollArray[block][0].damageType + " damage";
        infoAppend += "</span><br>";
    }
    
    var header = totalHits.toString() + " attacks landed <br>";    
    if (numCrits > 0) {
        header += "  <b>" + numCrits + " crits! </b><br>";
    }
    header += totalDamage.toString().concat(" total damage delt<br>")
    header += "-=-=-=-=-=-=-=-=-=-=-=-=-=-<br>"
    infoAppend = header + infoAppend;
    infoArea.innerHTML = infoAppend;
    
    // After adding info to the box, add listeners for all of the headers so we can expand their details
    for (var block=0; block < numBlocks; block++) {
        var mobTag = blockArray[block];
        var id = `${mobTag}-Result`;
        document.getElementById(id).addEventListener('click', (event) => {
            toggleDetails(event, rollArray);
        }); 
    }        
}

async function discoveryStep(attackRoll) {
  // spawn the block and wait for user input
  return new Promise((resolve, reject) => {    
    var template = discoveryTemplate(attackRoll);
    document.getElementById("discoveryArea").innerHTML = template; 
             

    document.getElementById("hitButton").addEventListener("click", () => {
      resolve(true);
    });
    document.getElementById("missButton").addEventListener("click", () => {
      resolve(false);
    });
  });
}
  
