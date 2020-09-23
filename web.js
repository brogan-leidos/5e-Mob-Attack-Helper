import Mob from './presents/Mob.js'
import { mobBlock } from './templates/Mob-Block.js'
import { weaponsToHtml } from './templates/utils.js'
import { discoveryTemplate } from './templates/Discovery-Template.js'
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
       
    } else {
        document.getElementById(mobTag).firstElementChild.style.backgroundColor = mobBlockDisableColor;
        toggle.classList = "fa fa-eye-slash";
        toggle.checked = false;
    }
}

function toggleRange(mobTag) {    
    var inMelee = document.getElementById(mobTag + "-Range").checked;
    if (inMelee) {
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
       
       appendBlock = appendBlock.replace("FILLER-WEAPON", "1d6 + 3");
       appendBlock = appendBlock.replace("FILLER-TOHIT", "0");
       
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
        if (!newMob.EquipWeapon.WeaponString) {
            appendBlock = appendBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.NumDice.toString() + "d" + newMob.EquipWeapon.DamageDie.toString().concat(" + ").concat(newMob.EquipWeapon.BonusToDmg.toString()).concat(" " + newMob.EquipWeapon.DamageType));
        }
        else {
            appendBlock = appendBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.WeaponString);
        }
        appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);    

        mobBlockArea.insertAdjacentHTML('beforeend', appendBlock);
            
        document.getElementById(mobTag + "-Weapon-Select").addEventListener('change', (temp) => {
            changeMobWeapon(mobTag, temp.target.value);        
        });
    }
    
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
        expandWeapon(mobTag, e);        
    });
    document.getElementById(mobTag + "-Range").checked = true; //True = Melee (w/i 5ft), False = Ranged
    document.getElementById(mobTag + "-Range").addEventListener('click', (e) => {
        toggleRange(mobTag);
    });
    
    if (newMob.EquipWeapon.WeaponString2) {
        expandWeapon(mobTag);
        document.getElementById(`${mobTag}-Weapon2`).value = newMob.EquipWeapon.WeaponString2;
    }
         
    return; 
}

function mobHasExpandedWeapon(mobTag) {
    return !!document.getElementById(`${mobTag}-WeaponExpandRow1`);
}

function expandWeapon(mobTag, event) {
    var modRow = document.getElementById(mobTag).firstElementChild.firstElementChild.children.length - 7;
    var modSelect = document.getElementById(`${mobTag}-${modRow-1}-Mod-Select`);
    if (!modSelect) {
        document.getElementById(event.target.id).insertAdjacentHTML('beforebegin',`<span class="weaponCollapseButton fa fa-minus-square-o" id="${mobTag}-Weapon-Collapse"></span>`);
        document.getElementById(mobTag + "-Weapon-Collapse").addEventListener('click', (e) => {
            collapseRow(e);
        });  
    }
    var underDc = checkIfUnderDc(mobTag, modRow);
    var newRow = modifierRow(underDc).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`); //example: Mob0-0-Mod-Select, or, Mob0-0-Mod
    var parentRow = document.getElementById(event.target.id).parentElement.parentElement;    
    parentRow.insertAdjacentHTML('beforebegin', newRow);
         
    modifyRow("Extra Damage", mobTag, modRow);
    assignListenersToModRow(mobTag, modRow);                     
}

function assignListenersToModRow(mobTag, modRow) {
    var modSelect = document.getElementById(`${mobTag}-${modRow}-Mod-Select`);
    modSelect.addEventListener('change', (e) => {
        modifyRow(e.target.value, e.target.id.split("-")[0], e.target.id.split("-")[1].split("-")[0]);
    });  
}

function modifyRow(value, mobTag, modRow) {    
    var targetCell = document.getElementById(`${mobTag}-${modRow}-Mod`);    
    targetCell.parentElement.innerHTML = chooseModifierType(value, mobTag, modRow);
    if (value == "DC") {
        document.getElementById(`${mobTag}-${modRow}-Mod`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
    } else {
        document.getElementById(`${mobTag}-${modRow}-Mod`).parentElement.parentElement.style.backgroundColor = "transparent"
    }
    updateWeaponModRows(value, mobTag, modRow);
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

function updateWeaponModRows(value, mobTag, modRow) {
    // If it falls under a DC, mark it as so
    if (checkIfUnderDc(mobTag, modRow)) {
        document.getElementById(`${mobTag}-${modRow}-Mod`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
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

function collapseRow(e) {
    var prevTr = document.getElementById(e.target.id).parentElement.parentElement.previousElementSibling;
    prevTr.remove();
    prevTr = document.getElementById(e.target.id).parentElement.parentElement.previousElementSibling;
    var mobTag = e.target.id.split("-")[0];
    if (prevTr.children[2].firstElementChild.id == `${mobTag}-Weapon`) {
        document.getElementById(e.target.id).remove();
    }

}

function changeMobWeapon (mobTag, newValue) {
    var toHit = parseInt(newValue.split("ToHit:")[1].split("Weapon:")[0]);
    var weapon = newValue.split("Weapon:")[1].split("Weapon2:")[0];
    var weapon2 = newValue.split("Weapon2:")[1];
    document.getElementById(mobTag + "-ToHit").value = toHit;
    document.getElementById(mobTag + "-Weapon").value = weapon;
    if (weapon2 != "undefined" && weapon2 != "") {
        if (!mobHasExpandedWeapon(mobTag)){
            expandWeapon(mobTag);
        }
        document.getElementById(mobTag + "-Weapon2").value = weapon2;
    }
    else {
        if (mobHasExpandedWeapon(mobTag)) {
            expandWeapon(mobTag);
        }
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
                    if (rollArray[i][j].crit && rollArray[i][j].hitRoll != 1) {
                        detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px; color:#b59800"> [20!]`;
                        for (var dmg=0; dmg < rollArray[i][j].damageResults.length; dmg++) {
                            detailAppend += ` ⚔${rollArray[i][j].damageResults[dmg][0]}`;
                        }
                        detailAppend += ` </span><br>`;
                    }
                    else if (rollArray[i][j].crit && rollArray[i][j].hitRoll == 1) {
                        detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px; color:#b00000"> [1] Crit Miss</span><br>`;                        
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
                 
            //TODO: Add ailments and bonuses
            var rollResult = "";
            var attackRollClass = mobArray[block][i].makeAttack();
            var attackRoll = attackRollClass.hitRoll;
            if (attackRollClass.crit && !attackRollClass.missed) {
                rollResult = mobArray[block][i].dealCrit();
                numCrits = numCrits + 1;
            }
            else if (attackRollClass.crit && !attackRollClass.missed) {
                rollResult = mobArray[block][i].miss();
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
         
//             var dcLowestSave = -1;
//             var dcHighestFail = -1;
            var mobDc = mobArray[block][i].checkIfHasDc();
            if (mobDc != false) {
                var savingThrow = null;
                var roll = null;
                if ((mobDc < dcLowestSave || dcLowestSave == -1) && (mobDc > dcHighestFail)) {
                    roll = Math.floor(Math.random() * 20 + 1);
                    savingThrow = await promptDc(roll);
                }
                else if (mobDc > dcLowestSave) {
                    savingThrow = true;
                }
                else if (mobDc < dcHighestFail) {
                    savingThrow = false;
                }
                if (!savingThrow) {
                    if (roll > dcHighestFail) {
                        dcHighestFail = roll;
                    }
                    var failureResults = mobArray[block][i].failDc(); // Changes to make after a dc fail
                    for (var fail=0; fail < failureResults.length; fail++) {
                        if (fail[0] == "Condition") {
                            ailments[fail[1]] = true;
                        }
                        else if (fail[0] == "Roll Class") {
                            rollResult = fail[1];
                        }
                    }
                }
                else {
                    if (roll < dcLowestSave) {
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
        var numOfBlockCrits = rollArray[block].filter(a => a.crit == true && a.hitRoll != 1).length;
             
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
    document.getElementById("discoveryArea").innerHTML = discoveryTemplate("To Hit", attackRoll);           

    document.getElementById("hitButton").addEventListener("click", () => {
      resolve(true);
    });
    document.getElementById("missButton").addEventListener("click", () => {
      resolve(false);
    });
  });
}

async function promptDc(roll) { 
  // spawn the block and wait for user input
  return new Promise((resolve, reject) => {    
    document.getElementById("discoveryArea").innerHTML = discoveryTemplate("Saving Throw", roll, "Success", "Failure");           

    document.getElementById("hitButton").addEventListener("click", () => {
      resolve(true);
    });
    document.getElementById("missButton").addEventListener("click", () => {
      resolve(false);
    });
  });
}

