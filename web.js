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
    var range = document.getElementById(mobTag + "-Range");
    if (range.classList[2] == "fa-compress") {
        range.classList = "rangeToggleButton fa fa-expand";
    }
    else {
        range.classList = "rangeToggleButton fa fa-compress";
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
    var modSelect = document.getElementById(mobTag + "-Mod-Select");
    if (!modSelect) {
        document.getElementById(event.target.id).insertAdjacentHTML('beforebegin',`<span class="weaponCollapseButton fa fa-minus-square-o" id="${mobTag}-Weapon-Collapse"></span>`);
        document.getElementById(mobTag + "-Weapon-Collapse").addEventListener('click', (e) => {
        collapseRow(e);
    });  
    }
    var newRow = modifierRow().replace(/FILLER-BLOCK/g, mobTag);
    var parentRow = document.getElementById(event.target.id).parentElement.parentElement;    
    parentRow.insertAdjacentHTML('beforebegin', newRow);

    modSelect = document.getElementById(mobTag + "-Mod-Select");
    modSelect.addEventListener('change', (e) => {
        modifyRow(e.target.value, e.target.id.split("-")[0]);
    });
         
         
//     var weaponDetailsHtml = `<tr id="${mobTag}-WeaponExpandRow1">
//                                 <td>&nbsp</td>
//                                 <td>Weapon 2:</td>
//                                 <td><input id="${mobTag}-Weapon2" type="text" /></td>
//                             </tr>
//                             <tr id="${mobTag}-WeaponExpandRow2">
//                                 <td>&nbsp</td>
//                                 <td></td>
//                                 <td><input title="If checked, these dice will also be doubled in a crit" id="${mobTag}-IncludeCrit" name="includeCrit" type="checkbox" /> <label for="includeCrit">Include in crit</label></td>                                
//                             </tr>`;
//     var element = document.getElementById(mobTag + "-Weapon-Expand");
//     if (!document.getElementById(`${mobTag}-WeaponExpandRow1`)) {
//         element.parentElement.parentElement.insertAdjacentHTML('afterend', weaponDetailsHtml);
//     }
//     else {
//         document.getElementById(`${mobTag}-WeaponExpandRow1`).remove();
//         document.getElementById(`${mobTag}-WeaponExpandRow2`).remove();
//     }
    
}

function modifyRow(value, mobTag) {    
    //TODO: < 1 Row
    var targetCell = document.getElementById(mobTag + "-Mod");
    targetCell.parentElement.innerHTML = chooseModifierType(value, mobTag);   
}

function collapseRow(e) {
    var prevTr = document.getElementById(e.target.id).parentElement.parentElement.previousSibling;
    prevTr.remove();
    prevTr = document.getElementById(e.target.id).parentElement.parentElement.previousSibling;
    var mobTag = e.target.id.split("-")[0];
    if (prevTr.children[2].firstElement.id == `${mobTag}-Weapon`) {
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
        throwError(`Weapon string: ${weapon} is invalid`);
    }
    var numAttacks = parseInt(weapon.substr(0, dSplitIndex).trim());
    var splitWeapon = weapon.substr(dSplitIndex + 1);
    
    splitWeapon = splitWeapon.split("+");
    var flipBit = 1;
    if (splitWeapon.length == 1) { // no result found for +, try -
        splitWeapon = splitWeapon[0].split("-");       
        if (splitWeapon.length == 1) {
            throwError(`Weapon string: ${weapon} is invalid`);
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
                    if (rollArray[i][j].hitRoll == "crit") {
                        detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px; color:#b59800"> [${rollArray[i][j].hitRoll}] ⚔${rollArray[i][j].damageRoll}`;
                         if (rollArray[i][j].damageRoll2 != 0) {
                                detailAppend += ` ⚔${rollArray[i][j].damageRoll2}`;
                            }
                        detailAppend += ` </span><br>`;
                    }
                    else {
                        if (rollArray[i][j].missed == false) {
                            detailAppend += `<span id="${mobTag}-Detail" style="margin-left:15px"> [${rollArray[i][j].hitRoll}] ⚔${rollArray[i][j].damageRoll}`;

                            if (rollArray[i][j].damageRoll2 != 0) {
                                detailAppend += ` ⚔${rollArray[i][j].damageRoll2}`;
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
    var mobArray = []; // 2d arrays: Block type, attacks of that block
    var rollArray = [];
    var numCrits = 0;
    var numBlocks = blockArray.length;    
    
    // Activate the info box
    document.getElementById("infoAreaDiv").style.display = "inline-block";
    
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
        var weapon2 = "";
        var number = document.getElementById(blockArray[i].concat("-Number")).value;        
        var advantage = document.getElementById(blockArray[i].concat("-Adv")).checked;
        var disadvantage = document.getElementById(blockArray[i].concat("-Dis")).checked * -1;
        
        weapon = parseWeapon(weapon, tohit);
        if (document.getElementById(blockArray[i].concat("-Weapon2"))) {
            weapon2 = document.getElementById(blockArray[i].concat("-Weapon2")).value;
            var partofcrit = document.getElementById(blockArray[i].concat("-IncludeCrit")).checked;
            weapon2 = parseWeapon(weapon2, tohit);
        }
        
        var vantage = advantage + disadvantage;
        
        mobArray.push(new Array());
        for(var j=0; j < number; j++) {
            mobArray[mobArray.length-1].push(new Mob(name, icon, weapon, vantage, blockArray[i], weapon2, partofcrit))
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
              if (attackRoll <= lowerCap) { // Auto assign miss to anything lower than a declared miss
                  rollArray[block].push(mobArray[block][i].miss());
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
                          rollArray[block].push(mobArray[block][i].miss());
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
            else { //Assuming this is a miss
                rollArray[block].push(mobArray[block][i].miss());
            }
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
        totalHits += rollArray[block].filter(a => a.missed == false).length;
        var attacker = rollArray[block][0].attacker;
        var numOfBlockCrits = 0;
        var blockTotalDamage = 0;
        var blockTotalDamage2 = 0;
        
        // Go through each unit in the block and tally up that damage
        for (var i=0; i < rollArray[block].length; i++) {
            if (rollArray[block][i].missed == true) {
                continue;
            }
                 
            totalDamage += rollArray[block][i].damageRoll;
            totalDamage += rollArray[block][i].damageRoll2;
            blockTotalDamage += rollArray[block][i].damageRoll;
            blockTotalDamage2 += rollArray[block][i].damageRoll2;

            if (rollArray[block][i].crit) {
                numOfBlockCrits += 1;
            }

        }
        var blockNumHits = rollArray[block].filter(a => a.missed == false).length;
        infoAppend += `<div class="mobHeader" id="${attacker.MobName}-Result"> <i id="${attacker.MobName}-Caret" class="fa fa-caret-down"></i> ${attacker.Icon} ${attacker.Name} : ${blockNumHits} hits`;
        if (numOfBlockCrits > 0) {
            infoAppend += " (🌟" + numOfBlockCrits.toString() + " crits)";
        }
        infoAppend += " : " + blockTotalDamage.toString() + " total " + rollArray[block][0].damageType + " damage";
        if (blockTotalDamage2 != 0) {
            infoAppend += ` + ${blockTotalDamage2} total ${rollArray[block][0].damageType2} damage`;
        }
        infoAppend += "</div>";
        
        // Create a detailed breakdown while we're tallying damage. WE should come back and consolidate these two methods to just use the breakdown
        if (!totalDamageBreakdown[rollArray[block][0].damageType]) { 
            totalDamageBreakdown[rollArray[block][0].damageType] = 0;
        }
        totalDamageBreakdown[rollArray[block][0].damageType] += blockTotalDamage;
        
        if (!totalDamageBreakdown[rollArray[block][0].damageType2]) { 
            totalDamageBreakdown[rollArray[block][0].damageType2] = 0;
        }
        totalDamageBreakdown[rollArray[block][0].damageType2] += blockTotalDamage2;
    }
    
    if ("" in totalDamageBreakdown) {
         delete totalDamageBreakdown[""];
    }
         
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
  
