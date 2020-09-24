import Mob from './presents/Mob.js'
import { mobBlock } from './templates/Mob-Block.js'
import { weaponsToHtml } from './templates/utils.js'
import { discoveryTemplate, dcTemplate } from './templates/Discovery-Template.js'
import { modifierRow, chooseModifierType } from './templates/WeaponModMenu.js'
import { Weapon, DamageRoll, Skeleton, Zombie, Ghoul, Wolf, ObjectTiny, ObjectSmall, ObjectMedium, ObjectLarge, ObjectHuge, TinyServant,
         Dretch, Mane, Berserk, Elk, Imp, Quasit } from './presents/index.js'

var mobBlockDefaultColor = "#f9f9eb";
var mobBlockDisableColor = "grey";
var mobBlockAdvantageColor = "#efffe6";
var mobBlockDisadvantageColor = "#ffede6";
var mobBlockDcColor = "lightgrey";

var mobIncrement = 0; // Used to generate unique names for each mob block
var blockArray = []; // Used globally as a reference to what mob blocks exist on the page

var mobReference = [new Skeleton(), new Zombie(), new Ghoul(), new Wolf(), 
                    new ObjectTiny(), new ObjectSmall(), new ObjectMedium(), new ObjectLarge(), new ObjectHuge(), new TinyServant(),
                    new Dretch(), new Mane(), new Berserk(), new Elk(), new Imp(), new Quasit()];

export default () => {        
    var mobBlockArea = document.getElementById('mobBlockArea');
    var infoArea = document.getElementById('infoArea'); // Debug info and roll info
    
    var buttons = document.getElementsByClassName("addMobButton");
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (e) => {
           createPresent(e.target.value); 
        });
    }      
             
    document.getElementById('targetAc').addEventListener('change', (newAc) => {
        discoveryCheck(newAc);        
    });
    document.getElementById('goButton').addEventListener('click', () => {        
        launchAttack();
    });
    document.getElementById('goButton-mobile').addEventListener('click', () => {        
        launchAttack();
    });
         
    // infoButton
    document.getElementById('infoButton').addEventListener('click', () => {        
        displayHelp();
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

function displayHelp() {
    alert(`How to use:
1. Set the target's AC in the first input box (Use a number <= 0 if unsure of the AC)
2. Create a "Mob" using one of the buttons in the Add Mobs section
3. Click the Launch Attack button, causing all active mobs to attack the target AC!`);
}

function toggleMob(mobTag) {
    var toggle = document.getElementById(mobTag + "-Enabled");
    var enabled = toggle.checked;
    if (!enabled) {
        toggle.checked = true;
        changeVantage(mobTag); 
        toggle.classList = "fa fa-eye";
        document.getElementById(mobTag + "-Disable-Label").innerHTML = "";
       
    } else {
        document.getElementById(mobTag).firstElementChild.style.backgroundColor = mobBlockDisableColor;
        toggle.classList = "fa fa-eye-slash";
        toggle.checked = false;
        document.getElementById(mobTag + "-Disable-Label").innerHTML = "Disabled";
    }
}

function toggleRange(mobTag) {    
    var isMelee = document.getElementById(mobTag + "-Range").checked;
    if (isMelee) {
        document.getElementById(mobTag + "-Ranged").style.color = "black";
        document.getElementById(mobTag + "-Melee").style.color = "lightgrey";
        document.getElementById(mobTag + "-Range").checked = false;
    }
    else {
        document.getElementById(mobTag + "-Ranged").style.color = "lightgrey";
        document.getElementById(mobTag + "-Melee").style.color = "black";
        document.getElementById(mobTag + "-Range").checked = true;
    }
}

function setRange(mobTag, isMelee) {
    if (!isMelee) {
        document.getElementById(mobTag + "-Ranged").style.color = "black";
        document.getElementById(mobTag + "-Melee").style.color = "lightgrey";
        document.getElementById(mobTag + "-Range").checked = false;
    }
    else {
        document.getElementById(mobTag + "-Ranged").style.color = "lightgrey";
        document.getElementById(mobTag + "-Melee").style.color = "black";
        document.getElementById(mobTag + "-Range").checked = true;
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
   if (filtered.length == 0) {  // Generic
       appendBlock = appendBlock.replace(/FILLER-BLOCK/g, mobTag);
       appendBlock = appendBlock.replace("FILLER-NAME", mobTag);
       
       appendBlock = appendBlock.replace("FILLER-WEAPON", "1d6 + 3 slashing");
       appendBlock = appendBlock.replace("FILLER-TOHIT", "2");
       
       mobBlockArea.insertAdjacentHTML('beforeend', appendBlock);
       
       document.getElementById(mobTag + "-Weapon-Select").remove();       
    }
    else {
        newMob = filtered[0];

        var additionalOptions = weaponsToHtml(newMob.Weapons);
        appendBlock = appendBlock.replace("ADDITIONAL-WEAPONS", additionalOptions);
        var equipName = "\"" + newMob.EquipWeapon.Name + "\"";
        appendBlock = appendBlock.replace(equipName, equipName.concat(" selected"));

        appendBlock = appendBlock.replace(/FILLER-BLOCK/g, mobTag);    
        appendBlock = appendBlock.replace("FILLER-NAME", newMob.Name);
        appendBlock = appendBlock.replace(newMob.Icon, newMob.Icon.concat(" selected"));
 
        appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);    

        mobBlockArea.insertAdjacentHTML('beforeend', appendBlock);
        
        changeMobWeapon(mobTag, newMob.EquipWeapon.WeaponMods)
        document.getElementById(mobTag + "-Weapon-Select").addEventListener('change', (e) => {
            changeMobWeapon(mobTag, e.target.value);        
        });
    }
    
    document.getElementById(mobTag).style.gridRow = blockArray.length;
         
    document.getElementById(mobTag + "-Delete").addEventListener('click', () => {        
        deleteMob(mobTag);
    });
    
    document.getElementById(mobTag + "-Enabled").checked = true;
    document.getElementById(mobTag + "-Enabled").addEventListener('click', () => {        
        toggleMob(mobTag);
    });    
    
    document.getElementById(mobTag + "-Adv").addEventListener('change', (e) => {
        changeVantage(mobTag);        
    });
    document.getElementById(mobTag + "-Dis").addEventListener('change', (e) => {
        changeVantage(mobTag);        
    });
    document.getElementById(mobTag + "-Weapon-Expand").addEventListener('click', (e) => {
        expandWeapon(mobTag);        
    });
    document.getElementById(mobTag + "-Range").checked = true; //True = Melee (w/i 5ft), False = Ranged
    document.getElementById(mobTag + "-Range").addEventListener('click', (e) => {
        toggleRange(mobTag);
    });
         
    document.getElementById(mobTag + "-Move-Up").addEventListener('click', (e) => {
        moveMob(mobTag, "Up");
    });
    document.getElementById(mobTag + "-Move-Down").addEventListener('click', (e) => {
        moveMob(mobTag, "Down");
    }); 
         
    return; 
}

function moveMob(mobTag, direction) {
    var mobBlock = document.getElementById(mobTag);
    var tmp = blockArray;
    var selectedIndex = -1;
    for (var i=0; i < blockArray.length; i++) {
        if (blockArray[i] == mobTag) {
            selectedIndex = i;
            break;
        }
    }
    
    if ((direction == "Up" && selectedIndex == 0) || (direction == "Down" && selectedIndex == blockArray.length-1)) {
        return;
    }
    
    var dir = direction == "Up" ? -1 : 1;

    var holdBlock = document.getElementById(blockArray[selectedIndex]);    
    var swapBlock = document.getElementById(blockArray[selectedIndex + dir]);
    holdBlock.style.gridRow = selectedIndex + 1 + dir;
    swapBlock.style.gridRow = selectedIndex + 1;
    
    var holdTag = blockArray[selectedIndex];
    blockArray[selectedIndex] = blockArray[selectedIndex + dir];
    blockArray[selectedIndex + dir] = holdTag;
           
}

function expandWeapon(mobTag) {
    var modRow = getNumModRows(mobTag);
    var modSelect = document.getElementById(`${mobTag}-${modRow-1}-Mod-Select`);
    if (!modSelect) {
        document.getElementById(`${mobTag}-Weapon-Expand`).insertAdjacentHTML('beforebegin',`<span class="weaponCollapseButton" id="${mobTag}-Weapon-Collapse"><i class="fa fa-minus-square-o"></i></span>`);
        document.getElementById(`${mobTag}-Weapon-Expand-Tip`).style.display = "none";  
        document.getElementById(mobTag + "-Weapon-Collapse").addEventListener('click', (e) => {
            collapseRow(e.target.parentElement.id);
        });  
    }
    var underDc = checkIfUnderDc(mobTag, modRow);
    var newRow = modifierRow(underDc).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`); //example: Mob0-0-Mod-Select, or, Mob0-0-Mod
    var parentRow = document.getElementById(`${mobTag}-Weapon-Expand`).parentElement.parentElement;    
    parentRow.insertAdjacentHTML('beforebegin', newRow);
         
    modifyRow("Extra Damage", mobTag, modRow);
    assignListenersToModRow(mobTag, modRow);                     
}

function getNumModRows(mobTag) {
    return document.getElementById(mobTag).firstElementChild.firstElementChild.children.length - 7;
}

// Not created by user, used to change present weapons
function assignWeaponMod(mobTag, weaponMod) {
    if (!document.getElementById(`${mobTag}-Weapon-Collapse`) && weaponMod) {
        document.getElementById(`${mobTag}-Weapon-Expand`).insertAdjacentHTML('beforebegin',`<span class="weaponCollapseButton" id="${mobTag}-Weapon-Collapse"><i class="fa fa-minus-square-o"></i></span>`);
        document.getElementById(`${mobTag}-Weapon-Expand-Tip`).style.display = "none";     
        document.getElementById(mobTag + "-Weapon-Collapse").addEventListener('click', (e) => {
            collapseRow(`${mobTag}-Weapon-Collapse`);
        });  
    }
         
    var modRow = getNumModRows(mobTag);
    var underDc = checkIfUnderDc(mobTag, modRow);
    var newRow = modifierRow(underDc).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`);
    
    var parentRow = document.getElementById(`${mobTag}-Weapon-Expand`).parentElement.parentElement;
    parentRow.insertAdjacentHTML('beforebegin', newRow);
    
    modifyRow(weaponMod[0], mobTag, modRow, true);
    document.getElementById(`${mobTag}-${modRow}-Mod-Select`).value = weaponMod[0];
    document.getElementById(`${mobTag}-${modRow}-Mod`).value = weaponMod[1];
    if (weaponMod[2]) {
        document.getElementById(`${mobTag}-${modRow}-Mod-Dc`).value = weaponMod[2];
    }
    assignListenersToModRow(mobTag, modRow); 
}

function assignListenersToModRow(mobTag, modRow) {
    var modSelect = document.getElementById(`${mobTag}-${modRow}-Mod-Select`);
    modSelect.addEventListener('change', (e) => {
        modifyRow(e.target.value, e.target.id.split("-")[0], e.target.id.split("-")[1].split("-")[0]);
    });  
}

function modifyRow(value, mobTag, modRow, automated=false) {    
    var targetCell = document.getElementById(`${mobTag}-${modRow}-Mod`);    
    targetCell.parentElement.innerHTML = chooseModifierType(value, mobTag, modRow);
    if (value == "DC") {
        document.getElementById(`${mobTag}-${modRow}-Mod`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
    } else {
        document.getElementById(`${mobTag}-${modRow}-Mod`).parentElement.parentElement.style.backgroundColor = "transparent"
    }
    updateWeaponModRows(value, mobTag, modRow, automated);
}

function checkIfUnderDc(mobTag, modRow) {
    for (var i = modRow-1; i >= 0; i--) {
        var selectSeek = document.getElementById(`${mobTag}-${i}-Mod-Select`);
        if (selectSeek.value == "DC") {
            return true;          
        }
    }
    return false;
}

// Updates DC grouping/ungrouping
function updateWeaponModRows(value, mobTag, modRow, automated=false) {
    // If it falls under a DC, mark it as so
    if (checkIfUnderDc(mobTag, modRow)) {
        document.getElementById(`${mobTag}-${modRow}-Mod`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
    }
    else if ((modRow + 1) == getNumModRows(mobTag) && value == "DC" && automated) {
        // User created DC on the last available row. Create a new row to help them out
        assignWeaponMod(mobTag, ["Condition", "Knock Prone"]);
    }
    else {
        // Scan down - if value is DC mark all below as DC, if its not mark all below as not until we hit DC
        while(true) {
            modRow++;
            var seekMod = document.getElementById(`${mobTag}-${modRow}-Mod-Select`);
            if (seekMod) {
                if (seekMod.innerHTML.includes("DC") && value == "DC") { // Not marked as under DC, but under focus row which is DC
                     // fix the selection
                    var rowReplace = seekMod.parentElement.parentElement;
                    rowReplace.innerHTML = modifierRow(true).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`);
                    modifyRow("Damage (1/2 on save)", mobTag, modRow);
                    document.getElementById(`${mobTag}-${modRow}-Mod-Select`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
                    assignListenersToModRow(mobTag, modRow);
                }
                else if (!seekMod.innerHTML.includes("DC") && value != "DC") { // Marked as under DC, but under focus row which is not DC
                    // Fix row
                    var rowReplace = seekMod.parentElement.parentElement;
                    rowReplace.innerHTML = modifierRow(false).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`);
                    modifyRow("Extra Damage", mobTag, modRow);
                    document.getElementById(`${mobTag}-${modRow}-Mod-Select`).parentElement.parentElement.style.backgroundColor = "transparent";
                    assignListenersToModRow(mobTag, modRow);
                }               
                else { break; }
            }       
            else { break; }            
        }
    }
}

// Expects ID of collapse button
function collapseRow(id) {
    var prevTr = document.getElementById(id).parentElement.parentElement.previousElementSibling;    
    prevTr.remove();
    prevTr = document.getElementById(id).parentElement.parentElement.previousElementSibling;
    var mobTag = id.split("-")[0];
    if (prevTr.children[2].firstElementChild.id == `${mobTag}-Weapon`) {
        document.getElementById(id).remove();
        document.getElementById(`${mobTag}-Weapon-Expand-Tip`).style.display = "inline-block";
    }

}

function changeMobWeapon (mobTag, weaponMods) {
    if (typeof weaponMods == "string") {
        weaponMods = weaponMods.replace(/'/g, "\"");
        weaponMods = JSON.parse(weaponMods)
    }
    
    // clean up existing rows
    var numModRows = getNumModRows(mobTag);
    for (var i=0; i < numModRows; i++) {
        collapseRow(`${mobTag}-Weapon-Collapse`);
    }
    
    var toHit = weaponMods[0][1];
    var weapon = weaponMods[2][1];
    var isMelee = weaponMods[1][1];
    document.getElementById(mobTag + "-ToHit").value = toHit;
    document.getElementById(mobTag + "-Weapon").value = weapon;    
    setRange(mobTag, isMelee)   
    
    for (var i=3; i < weaponMods.length; i++) {
        assignWeaponMod(mobTag, weaponMods[i]);        
    }                     
}

function changeVantage(mobTag) {
    var adv = document.getElementById(mobTag + "-Adv").checked;
    var dis = document.getElementById(mobTag + "-Dis").checked;
    var mob = document.getElementById(mobTag);
    var enabled = document.getElementById(mobTag + "-Enabled").checked;

    if (!enabled) {
        return;
    }
         
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

function throwError(msg) {
    document.getElementById("infoArea").innerHTML = msg;
}

function toggleDetails(event, rollArray) {
    var mobTag = event.target.id.split("-")[0];
    var detailElement = document.getElementById(mobTag + "-Details");
    if (detailElement == null) {
        var detailAppend = `<div id=${mobTag}-Details>`;

        for (var i=0; i < rollArray.length; i++) {
            for (var j=0; j < rollArray[i].length; j++) {
                if (rollArray[i][j].attacker.MobName == mobTag) {
                    if (rollArray[i][j].crit && !rollArray[i][j].missed) {
                        detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px; color:#b59800"> [20!]`;
                        for (var dmg=0; dmg < rollArray[i][j].damageResults.length; dmg++) {
                            detailAppend += ` ⚔${rollArray[i][j].damageResults[dmg][0]}`;
                        }
                        detailAppend += ` </span><br>`;
                    }
                    else if (rollArray[i][j].crit && rollArray[i][j].missed) {
                        detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px; color:#b00000"> [1] Crit Miss</span><br>`;                        
                    }
                    else if (rollArray[i][j].autoCrit) {
                        detailAppend += `<span id="${mobTag}-Detail" title="auto crit" style="margin-left:15px; color:#a6b500"> [20*]`;
                        for (var dmg=0; dmg < rollArray[i][j].damageResults.length; dmg++) {
                            detailAppend += ` ⚔${rollArray[i][j].damageResults[dmg][0]}`;
                        }
                        detailAppend += ` </span><br>`;
                    }
                    else {
                        if (rollArray[i][j].missed == false) {
                            detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px"> [${rollArray[i][j].hitRoll}]`;
                            for (var dmg=0; dmg < rollArray[i][j].damageResults.length; dmg++) {
                                detailAppend += ` ⚔${rollArray[i][j].damageResults[dmg][0]}`;
                            }
                        }
                        else {
                            detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px; color:#ff9191"> [${rollArray[i][j].hitRoll}] Miss`;
                        }
                        detailAppend += ` </span><br>`;
                    }
                }
            }
        }   
        detailAppend += "</div>";
        var tag = mobTag + "-Result";
        document.getElementById(tag).insertAdjacentHTML('beforeend', detailAppend);
         
        document.getElementById(`${mobTag}-Caret`).classList = "fa fa-caret-right";
    }
    else {
        detailElement.remove();
        document.getElementById(`${mobTag}-Caret`).classList = "fa fa-caret-down";
    }
}

async function launchAttack() {
    var rollArray = [];
    var numCrits = 0;       
    var numBlocks = blockArray.length; 
         
    // Activate the info box
    document.getElementById("infoAreaDiv").style.display = "inline-block";
    
    if (numBlocks == 0){
        throwError("There are no mobs available to attack with!");
        return;
    }              
    
    var mobArray = parseMobs(numBlocks);
    
    // Having spawned our army, let them all launch attacks. Record the attack if it lands
    var targetAc = document.getElementById('targetAc').value;
    
    // discovery is for when we dont know the target AC, it will step the attacks sequentially until we figure it out
    var discoveryModeFlag = false;
    if (targetAc <= 0) {
        discoveryModeFlag = true;
        var minAc = -1;
        var lowerCap = -1
    }
    
    var dcLowestSave = -1;
    var dcHighestFail = -1;    
    var ailments = {};
    
    for (var block=0; block < mobArray.length;block++) {
        rollArray[block] = new Array();
        for (var i=0; i < mobArray[block].length; i++) {
            document.getElementById("discoveryArea").innerHTML = ""; // Cleanup prompt space at start of rolls
            
            var advantage = 0;
            var disadvantage = 0;
            var inMelee = document.getElementById(`${mobArray[block][i].MobName}-Range`).checked;
            var allowParalyzeCrit = false;
            if (ailments["Knock Prone"]) {
                // if ranged gets disadvantage, else melee gets advantage               
                if (inMelee) {
                    advantage = 1;                
                } else {
                    disadvantage = -1;                    
                }
            }
            if (ailments["Restrain"]) {
                // advantage, disadv on dex saves
                advantage = 1;
            }
             if (ailments["Paralyze"]) {
                // advantage, auto fails str/dex saves
                 advantage = 1;
                 if (inMelee) {
                    allowParalyzeCrit = true;
                 }
            }
            
            mobArray[block][i].Vantage += advantage + disadvantage; // [-1,0,1] += [-1,0,1]            
                 
            var rollResult = "";
            var attackRollClass = mobArray[block][i].makeAttack();
            var attackRoll = attackRollClass.hitRoll;
            if (attackRollClass.crit && !attackRollClass.missed) {
                rollResult = mobArray[block][i].dealCrit();
                numCrits = numCrits + 1;
            }
            else if (attackRollClass.crit && attackRollClass.missed) {
                rollResult = mobArray[block][i].miss();
                continue;
            }
            else if (discoveryModeFlag) { // Discovery mode intercepts the natural flow of things here             
              if (attackRoll <= lowerCap) { // Auto assign miss to anything lower than a declared miss
                  rollArray[block].push(mobArray[block][i].miss());
                  continue;
              } 
              if (attackRoll < minAc || minAc == -1) {
                  var response = await discoveryStep(attackRoll);
                  if (response) {
                      rollResult = mobArray[block][i].dealDamage();
                      minAc = attackRoll;
                  }
                  else {
                      if (attackRoll > lowerCap) {
                          rollArray[block].push(mobArray[block][i].miss());
                          lowerCap = attackRoll;
                          continue;
                      }
                  }
              }
              else {
                  rollResult = mobArray[block][i].dealDamage();
              }                
            }
            else if (attackRoll >= targetAc) {                
                rollResult = mobArray[block][i].dealDamage();
            }
            else { //Assuming this is a miss
                rollArray[block].push(mobArray[block][i].miss());
                continue;
            }
         
            // Everything past here is assumed to take part on a hit
            
            if (allowParalyzeCrit && !attackRollClass.crit) {
                mobArray[block][i].purgeDamageResults(); // Clear that basic hit we just made, this is a crit!
                rollResult = mobArray[block][i].dealCrit();
                rollResult.crit = false;
                rollResult.autoCrit = true;
                numCrits = numCrits + 1;
            }
            
            var mobDcInfo = mobArray[block][i].checkIfHasDc();
            if (mobDcInfo != false) {
                var dcType = mobDcInfo[1];
                var savingThrow = null;
                var roll = Math.floor(Math.random() * 20 + 1);
                var autoFailSave = false;
                
                if (ailments["Restrain"] && dcType == "Dex") { // Gives Disadv to dex saves
                    var roll2 = Math.floor(Math.random() * 20 + 1);
                    roll = Math.min(roll, roll2);
                }
                if (ailments["Paralyze"] && (dcType == "Dex" || dcType == "Str")) { // Auto fails str and dex saves
                    autoFailSave = true;
                }
                
                if ((roll < dcLowestSave || dcLowestSave == -1) && (roll > dcHighestFail) && !autoFailSave) {                    
                    savingThrow = await promptDc(`DC: ${mobDcInfo[0]} ${dcType}`, roll);
                }
                else if (roll >= dcLowestSave) {
                    savingThrow = true;
                }
                else if (roll <= dcHighestFail || autoFailSave) {
                    savingThrow = false;
                }
                if (!savingThrow) {
                    if (roll > dcHighestFail || dcHighestFail == -1) {
                        dcHighestFail = roll;
                    }
                    var failureResults = mobArray[block][i].failDc(); // Changes to make after a dc fail
                    for (var fail=0; fail < failureResults.length; fail++) {
                        if (failureResults[fail][0] == "Condition") {
                            ailments[failureResults[fail][1]] = true;
                        }
                        else if (failureResults[fail][0] == "Roll Class") {
                            rollResult = failureResults[fail][1];
                        }
                    }
                }
                else {
                    if (roll < dcLowestSave || dcLowestSave == -1) {
                        dcLowestSave = roll;
                    }
                    rollResult = mobArray[block][i].succeedDc();                         
                }
            }
                       
            rollArray[block].push(rollResult);
        }
    }
  
    if (discoveryModeFlag) { //Cleanup after all rolls have been processed
      document.getElementById("discoveryArea").innerHTML = "";
    }
    
    // Take a sum of the attacks that landed. Boom, dead enemy, maybe.    
    var totalDamage = 0;
    var totalDamageBreakdown = {};
    var totalHits = 0;
    var infoAppend = "";    
    
    // Go through each block, take a sum of damage and # of hits
    for (var block=0; block < rollArray.length; block++) {
        if (rollArray[block].length == 0) {
            continue; // This means no one in the block landed a hit. Beep Boop Sad Toot
        }        
        var attacker = rollArray[block][0].attacker;
        var blockTotalDamage = 0;
        var blockDamageBreakdown = {};
        
        // Go through each unit in the block and tally up that damage
        for (var i=0; i < rollArray[block].length; i++) {
            if (rollArray[block][i].missed == true) {
                continue;
            }
            
            for (var weps=0; weps < rollArray[block][i].damageResults.length; weps++) {
                var wepDamage = rollArray[block][i].damageResults[weps][0];
                var damageType = rollArray[block][i].damageResults[weps][1];
                totalDamage += wepDamage;
                blockTotalDamage += wepDamage;
                
                if (!totalDamageBreakdown[damageType]) { 
                    totalDamageBreakdown[damageType] = 0;
                }
                totalDamageBreakdown[damageType] += wepDamage;
                
                if (!blockDamageBreakdown[damageType]) { 
                    blockDamageBreakdown[damageType] = 0;
                }
                blockDamageBreakdown[damageType] += wepDamage;
            }
        }
        var blockNumHits = rollArray[block].filter(a => a.missed == false).length;
        var numOfBlockCrits = rollArray[block].filter(a => (a.crit || a.autoCrit) && !a.missed).length;
             
        totalHits += blockNumHits;
        infoAppend += `<div class="mobHeader" id="${attacker.MobName}-Result"> <i id="${attacker.MobName}-Caret" class="fa fa-caret-down"></i> ${attacker.Icon} ${attacker.Name} : ${blockNumHits} hits`;
        if (numOfBlockCrits > 0) {
            infoAppend += ` (🌟 ${numOfBlockCrits} crits)`;
        }
        if (blockNumHits > 0){
            infoAppend += ` : `;
            var keys = Object.keys(blockDamageBreakdown);
            for (var i=0; i < keys.length; i++) {
                infoAppend += `${blockDamageBreakdown[keys[i]]} total ${keys[i]} damage`;
                if (i != keys.length - 1) {
                    infoAppend += ` + `;
                }
            }
        }
        infoAppend += "</div>";        
    }    

    generateFinalOutput(infoAppend, numBlocks, totalDamageBreakdown, totalDamage, totalHits, numCrits, rollArray); 
    
}

function parseMobs(numBlocks) {
    var mobArray = []; // 2d arrays: Block type, attacks of that block    

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
        var weapon = getWeaponSet(blockArray[i]);    
        var number = document.getElementById(blockArray[i].concat("-Number")).value;        
        var advantage = document.getElementById(blockArray[i].concat("-Adv")).checked;
        var disadvantage = document.getElementById(blockArray[i].concat("-Dis")).checked * -1;
        
        var vantage = advantage + disadvantage;
        
        mobArray.push(new Array());
        for(var j=0; j < number; j++) {
            mobArray[mobArray.length-1].push(new Mob(name, icon, weapon, vantage, blockArray[i]))
        }                
    }
    return mobArray;
}

// Collects all weapon mods and returns them in an array
function getWeaponSet(mobTag) {
    var toHit = document.getElementById(mobTag + "-ToHit").value;
    var weapon = document.getElementById(mobTag + "-Weapon").value;
    var ret = [["ToHit", toHit], ["Weapon", weapon]];
    var rowCount = 0
    while(true) {
        var modSelect = document.getElementById(`${mobTag}-${rowCount}-Mod-Select`);
        if (modSelect) {
            var mod = document.getElementById(`${mobTag}-${rowCount}-Mod`);
            if (modSelect.value == "DC") {
                ret.push([modSelect.value, mod.value, document.getElementById(`${mobTag}-${rowCount}-Mod-Dc`).value]);
            }
            else {
                ret.push([modSelect.value, mod.value]);
            }
        }
        else {
            break;
        }
        rowCount++;
    }
    return ret;
}

function generateFinalOutput(infoAppend, numBlocks, totalDamageBreakdown, totalDamage, totalHits, numCrits, rollArray) {
    var header = `<div id="resultOverview">`;
    header += `<div id="totalDamageTitle" title="${displayBreakdown(totalDamageBreakdown)}" style="cursor:help">${totalDamage} total damage delt`;
    if (totalDamage > 0) {
         header += `<br><span class="mobile-display" style="font-size:smaller">(${displayBreakdown(totalDamageBreakdown)})</span>`;
    }
    header += "</div>";
    header += `<div id="hitsOverview">${totalHits} attacks landed <br>`;
    if (numCrits > 0) {
        header += `<b style="color:gold">${numCrits} crits! </b><br>`;
    }
    header += "</div></div>";
    infoAppend = header + infoAppend;
    infoArea.innerHTML = infoAppend;
    
    // After adding info to the box, add listeners for all of the headers so we can expand their details
    for (var block=0; block < numBlocks; block++) {
        var mobTag = blockArray[block];
        var id = `${mobTag}-Result`;
        try {
            document.getElementById(id).addEventListener('click', (event) => {
                toggleDetails(event, rollArray);
            }); 
        } 
        catch(err) {
        }             
    }        
}

function displayBreakdown(totalDamageBreakdown) {
    var ret = "";
    var keys = Object.keys(totalDamageBreakdown);
    for (var i=0; i < keys.length; i++) {
        if (keys[i] == "") {
            continue;
        }
        ret += `${keys[i]}: ${totalDamageBreakdown[keys[i]]}`;
        if (i < keys.length-1) { 
            ret += ', ';
        }
    }
    return ret;
}

async function discoveryStep(attackRoll) {
  // spawn the block and wait for user input
  return new Promise((resolve, reject) => {    
    var option1 = "Hit!";
    var option2 = "Miss";
    document.getElementById("discoveryArea").insertAdjacentHTML('beforeend', discoveryTemplate("To Hit", attackRoll, option1, option2));           

    document.getElementById(`hitButton-${option1}`).addEventListener("click", (e) => {      
      resolve(true);
    });
    document.getElementById(`missButton-${option2}`).addEventListener("click", (e) => {
      resolve(false);
    });
  });
}

async function promptDc(dcInfo, roll) { 
  return new Promise((resolve, reject) => {  
    var option1 = "Success";
    var option2 = "Failure";
    document.getElementById("discoveryArea").insertAdjacentHTML('beforeend', dcTemplate("Saving Throw (Before modifiers)", dcInfo, roll, option1, option2));           

    document.getElementById(`hitButton-${option1}`).addEventListener("click", () => {
      resolve(true);
    });
    document.getElementById(`missButton-${option2}`).addEventListener("click", () => {
      resolve(false);
    });
  });
}

