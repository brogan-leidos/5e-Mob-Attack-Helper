import Mob from './presents/Mob.js'
import { mobBlock, weaponMenu } from './templates/Mob-Block.js'
import { weaponsToHtml } from './templates/utils.js'
import CreatureNotes from './templates/utils.js'
import { discoveryTemplate, dcTemplate, dcTemplateDmSaves } from './templates/Discovery-Template.js'
import { modifierRow, chooseModifierType } from './templates/WeaponModMenu.js'
import { Skeleton, Zombie, Ghoul, Wolf, ObjectTiny, ObjectSmall, ObjectMedium, ObjectLarge, ObjectHuge, TinyServant,
         Dretch, Mane, Berserk, Elk, Imp, Quasit, AbyssalWretch, Boar, GiantSnake, GiantOwl, Velociraptor, Orc, Goblin, 
         Bandit, Kobold, WingedKobold, Hobgoblin, Bugbear, DireWolf, GiantBoar, ConstrictSnake, PoisonSnake, FlyingSnake,
         GiantElk, GiantSpider, GiantWolfSpider, Weapon} from './presents/index.js'
import { actionWords, badGuyNames, standalonePhrases } from './names/wordList.js';


var mobBlockDefaultColor = "#f9f9eb";
var mobBlockDisableColor = "#666666";
var mobBlockAdvantageColor = "#efffe6";
var mobBlockDisadvantageColor = "#ffede6";
var mobBlockDcColor = "#aeaea0";

var mobIncrement = 0; // Used to generate unique names for each mob block
var blockArray = []; // Used globally as a reference to what mob blocks exist on the page

var usingSavingThrowMods = false;

var mobReference = [new Skeleton(), new Zombie(), new Ghoul(), new Wolf(), 
                    new ObjectTiny(), new ObjectSmall(), new ObjectMedium(), new ObjectLarge(), new ObjectHuge(), new TinyServant(),
                    new Dretch(), new Mane(), new Berserk(), new Elk(), new Imp(), new Quasit(), new AbyssalWretch(), new Boar(),
                    new GiantSnake(), new GiantOwl(), new Velociraptor(), new Orc(), new Goblin(), new Bandit(), new Kobold(), new WingedKobold(), 
                    new Hobgoblin(), new Bugbear(), new DireWolf(), new GiantElk(), new GiantBoar(), new ConstrictSnake(), new PoisonSnake(), new FlyingSnake(),
                    new GiantSpider(), new GiantWolfSpider()];

export default () => {        
    var mobBlockArea = document.getElementById('mobBlockArea');
    var infoArea = document.getElementById('infoArea'); // Debug info and roll info
    
    var buttons = document.getElementsByClassName("addMobButton");
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (e) => {
           createPresent(e.target.value); 
        });
    }      
    
    discoveryCheck(document.getElementById('targetAc').value);
         
    document.getElementById('targetAc').addEventListener('change', (newAc) => {
        discoveryCheck(newAc.target.value);        
    });
    document.getElementById('goButton').addEventListener('click', () => {        
        launchAttack();
    });
    document.getElementById('goButton-mobile').addEventListener('click', () => {        
        launchAttack();
    });
         
    document.getElementById('infoButton').addEventListener('click', () => {        
        displayHelp();
    });
         
    document.getElementById('setSavingThrowsButton').addEventListener('click', () => {        
        toggleAdvancedOptions();
    });

    document.getElementById('dmSavesInfo').addEventListener('click', () => {        
        alert("When this is checked, the tool will prompt you for a generic Saved/Failed response rather than rolling for the DM");
    });
     
};


// Checks if the target ac is below zero, if so enable discovery mode
function discoveryCheck(newAc) {
    if (newAc <= 0) {
        [...document.getElementsByClassName('hitRollNotification')].forEach(a => a.style.display = "inline-block");
    }
    else {
        [...document.getElementsByClassName('hitRollNotification')].forEach(a => a.style.display = "none");
    }
}

function deleteMob(mobTag) {
    blockArray = blockArray.filter(function(a) { return (a != mobTag) } );
    document.getElementById(mobTag).remove();
    
    for (var i=0; i < blockArray.length; i++) {
        document.getElementById(blockArray[i]).style.gridRow = i+1;
    }
    
    checkForExistingDc();
}

function displayHelp() {
    alert(` How to use:
1. Create a Mob of creatures using one of the buttons in the Add Mobs section. This represents a group of similar creatures.
2. Modify the Mob stats to your liking. Take note that when using multiple mobs, they will attack in order from top to bottom.
3. Click the Launch Attack button, causing all active mobs to attack the target!

4. Depending on how much info you provided under Target Info, the tool might prompt you to confirm if an attack hit the target or if the target succeeded on a saving throw. Work with your DM to determine the correct answers. 
`);
}

function toggleAdvancedOptions() {
    usingSavingThrowMods = !usingSavingThrowMods;
    var modTable = document.getElementById("savingThrowModTable");
    modTable.style.display = modTable.style.display == "table"  ? "none" : "table";
    checkForExistingDc()
    if (usingSavingThrowMods) {
        [...document.getElementsByClassName("savingThrowNotification")].forEach(a => a.style.display = "none");
    }
    var buttonIcon = document.getElementById("setSavingThrowsButton").firstElementChild;
    if (buttonIcon.classList.value.includes("fa-angle-double-down")) {
        buttonIcon.classList = "fa fa-angle-double-up";    
    }
    else {
        buttonIcon.classList = "fa fa-angle-double-down";
    }
    
}

function minimizeMob(mobTag) {
    var mobMin = document.getElementById(mobTag + "-Minimize");
    var mobBlock = document.getElementById(mobTag);
    var rows = mobBlock.children[1].firstElementChild.childElementCount; 
    
    if (mobMin.checked) {
        mobMin.firstElementChild.classList = "fa fa-window-maximize"
        mobMin.firstElementChild.style.fontSize = "10px"
        toggleVariantsMenu(mobTag, "maximize")
    }
    else {
        mobMin.firstElementChild.classList = "fa fa-window-minimize"
        mobMin.firstElementChild.style.fontSize = "8px"
        toggleVariantsMenu(mobTag, "minimize")
    }
         
    for(var i=3; i < rows-2; i++) {
        if (mobMin.checked) {
            mobBlock.children[1].firstElementChild.children[i].style.display = "none";           
        }
        else {
            mobBlock.children[1].firstElementChild.children[i].style.display = "table-row";
        }
    }
    if (mobMin.checked) {
         document.getElementById(mobTag + "-Maximize").style.display = "table-row";
    }
    else {
        document.getElementById(mobTag + "-Maximize").style.display = "none";
    }
    mobMin.checked = !mobMin.checked;
}

function cloneMob(mobTag) {        
    var originalMob = createMobsFromBlock(mobTag, true);        
    createPresent(""); 
    var newMobTag = mobIncrement - 1;
    changeBlockToMob(`Mob${newMobTag}`, originalMob);
}

function createMobsFromBlock(mobTag, ignoreEnable=false) {
    if (!document.getElementById(mobTag.concat("-Enabled")).checked && !ignoreEnable) {
        return []; // If the box is not checked, skip that mob block
    }        

    var name = document.getElementById(`${mobTag}-Name`).value + "-Clone";
    var icon = document.getElementById(`${mobTag}-Icon`);
    icon = icon.options[icon.selectedIndex].value;            
    var number = document.getElementById(`${mobTag}-Number`).value;        
    var advantage = document.getElementById(`${mobTag}-Adv`).checked;
    var disadvantage = document.getElementById(`${mobTag}-Dis`).checked * -1;
    var vantage = advantage + disadvantage;

    var numWeapons = findNumberOfWeaponsInBlock(mobTag);
    var multiattack = numWeapons > 1 ? numWeapons : false;
    var mobToAdd = new Mob(name, icon, [], vantage, mobTag, 1, multiattack);
    for (var j=0; j < numWeapons; j++) {
        var weaponNum = j != 0 ? j : ""; // Don't sent a number if its the first weapon
        var weaponStats = getWeaponSet(mobTag, weaponNum);
        var weaponName = `WeaponNum-${j}`                      
        
        if (!weapon) {
            return [];
        }                                       
        var newWeapon = new Weapon(weaponName, weaponStats);                
        mobToAdd.Weapons.push(newWeapon);
        mobToAdd.EquipWeapon = newWeapon;
        if (multiattack) {
            mobToAdd.multiattack.push(weaponName);
        }          
    }

    return newMob;
}

// mobTag -- block to change, mob -- a new Mob() with all the details needed to change the block
function changeBlockToMob(mobTag, newMob) {
    var html = generateMobBlockHTML(mobTag, "", newMob);
    var divStripRegex = new RegExp(`[^<div id="${mobTag}" class="overheadMobBlock">](?:.|\n)*[^<\/div>$]`, "g");
    var match = html.match(divStripRegex);
    html = match[0];
    var mobBlock = document.getElementById(mobTag);
    mobBlock.innerHTML = html;

    changeMobWeapon(mobTag, newMob.EquipWeapon.WeaponMods)
    if (newMob.Variants) {
        assignVariants(mobTag, newMob.Variants)
    }
    document.getElementById(mobTag + "-Weapon-Select").addEventListener('change', (e) => {
        changeMobWeapon(mobTag, e.target.value);        
    });

    assignEventsToBlock(mobTag, false);
}

function toggleMob(mobTag) {
    var toggle = document.getElementById(mobTag + "-Enabled").firstElementChild;
    var enabled = document.getElementById(mobTag + "-Enabled");
    if (!enabled.checked) {
        enabled.checked = true;
        changeVantage(mobTag); 
        toggle.classList = "fa fa-eye";
        document.getElementById(mobTag + "-Disable-Label").innerHTML = "";
       
    } else {
        shiftMobBlockColors(mobTag, mobBlockDisableColor);
        toggle.classList = "fa fa-eye-slash";
        enabled.checked = false;
        document.getElementById(mobTag + "-Disable-Label").innerHTML = "Disabled";
    }
}

function toggleRange(element) {   
    var rangeElement = element.parentElement;
    var isMelee = rangeElement.checked;
    if (isMelee) {
        rangeElement.children[1].style.color = "black"; // Ranged
        rangeElement.children[0].style.color = "lightgrey"; // Melee
        rangeElement.checked = false;
    }
    else {
        rangeElement.children[1].style.color = "lightgrey";
        rangeElement.children[0].style.color = "black";
        rangeElement.checked = true;
    }
}

function setRange(mobTag, isMelee, weaponNum="") {
    if (!isMelee) {
        document.getElementById(`${mobTag}-Ranged${weaponNum}`).style.color = "black";
        document.getElementById(`${mobTag}-Melee${weaponNum}`).style.color = "lightgrey";
        document.getElementById(`${mobTag}-Range${weaponNum}`).checked = false;
    }
    else {
        document.getElementById(`${mobTag}-Ranged${weaponNum}`).style.color = "lightgrey";
        document.getElementById(`${mobTag}-Melee${weaponNum}`).style.color = "black";
        document.getElementById(`${mobTag}-Range${weaponNum}`).checked = true;
    }
}

function createPresent(presentName) {
   // Create a unique ID for this new mob
   var mobTag = "Mob" + mobIncrement.toString();
   blockArray.push(mobTag);
   mobIncrement++;
    
   var mobBlockHTML = generateMobBlockHTML(mobTag, presentName);
   mobBlockArea.insertAdjacentHTML('beforeend', mobBlockHTML);

   var filtered = mobReference.filter(a => a.Name == presentName);
   if (filtered.length != 0) {
        var newMob = filtered[0];
        if (newMob.Multiattack) {
            for (var i=0; i < newMob.Multiattack.length; i++) {
                var weaponMods = newMob.Weapons.filter(a => a.Name == newMob.Multiattack[i])[0].WeaponMods;
                if (i > 0) {
                    addExtraAttack(mobTag);
                    changeMobWeapon(mobTag, weaponMods, i);
                }
                else {
                    changeMobWeapon(mobTag, weaponMods);
                }
            }
        }
        else {
            changeMobWeapon(mobTag, newMob.EquipWeapon.WeaponMods)
        }
        if (newMob.Variants) {
            assignVariants(mobTag, newMob.Variants)
        }
        document.getElementById(mobTag + "-Weapon-Select").addEventListener('change', (e) => {
            changeMobWeapon(mobTag, e.target.value);        
        });
    }
    
    assignEventsToBlock(mobTag);
         
}

function generateMobBlockHTML(mobTag, presentName, injectMob=null) {
    var appendBlock = mobBlock();
    var filtered = [];
    if (injectMob != null) {
        filtered = [injectMob];
    } else {
        filtered = mobReference.filter(a => a.Name == presentName);
    }
    
    if (filtered.length == 0) {  // Generic
        // No weapons to add so remove it here
        appendBlock = appendBlock.replace(/<select.*FILLER-BLOCK-Weapon-Select(?:.|\n)*<\/select>/g, "");
        appendBlock = appendBlock.replace(/FILLER-BLOCK/g, mobTag);
        appendBlock = appendBlock.replace("FILLER-NAME", mobTag);
        
        appendBlock = appendBlock.replace("FILLER-WEAPON", "1d6 + 3 slashing");
        appendBlock = appendBlock.replace("FILLER-TOHIT", "2");
        
        return appendBlock;
     }
     else {
         var newMob = filtered[0];
 
         if (!injectMob) {
            var additionalOptions = weaponsToHtml(newMob.Weapons);
            appendBlock = appendBlock.replace("ADDITIONAL-WEAPONS", additionalOptions);
         }
         var equipName = "\"" + newMob.EquipWeapon.Name + "\"";
         appendBlock = appendBlock.replace(equipName, equipName.concat(" selected"));
 
         appendBlock = appendBlock.replace(/FILLER-BLOCK/g, mobTag);    
         appendBlock = appendBlock.replace("FILLER-NAME", newMob.Name);
         appendBlock = appendBlock.replace(newMob.Icon, newMob.Icon.concat(" selected"));
  
         appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);    
 
        return appendBlock;
     }
}

function assignVariants(mobTag, newMobVariants) {
    var mobTable = document.getElementById(mobTag).children[1];
    var appendBlock = `<div class="creatureVariantMenu" id="${mobTag}-VariantsMenu" style="display: flex">`;
    var small = newMobVariants.length > 3 ? "small" : "";
    for (var i=0; i < newMobVariants.length; i++) {
        appendBlock += `<button class="creatureVariantButton ${small}" id="${mobTag}-ChangeVariant-${i}" value="${newMobVariants[i]}">${newMobVariants[i]}</button>`;
    }
    appendBlock += "</div>";

    mobTable.insertAdjacentHTML('afterend', appendBlock);

    // Add new menu option
    var variantButton = `<span class="mobVariantsButton" id="${mobTag}-VariantsToggle" title="Show/Hide variants of this creature type"><i class="fa fa-users"></i></span>`
    document.getElementById(`${mobTag}`).firstElementChild.insertAdjacentHTML('beforeend', variantButton);

    document.getElementById(`${mobTag}-VariantsToggle`).addEventListener('click', (e) => {
        toggleVariantsMenu(mobTag);
    });


    for (var i=0; i < newMobVariants.length; i++) {
        var element = document.getElementById(`${mobTag}-ChangeVariant-${i}`);
        element.addEventListener('click', (e) => {
            changeMobVariant(mobTag, e.target.value)
        });
    }
}

function toggleVariantsMenu(mobTag, source="user") {
    var menuElement = document.getElementById(`${mobTag}-VariantsMenu`);
    if (!menuElement) {
        return;
    }

    if (source == "maximize") {
        menuElement.style.display = "none";
    }
    else if (source == "minimize" && !menuElement.userHidden) {
        menuElement.style.display = "flex";
    }
    else if (source == "user") {
        if (menuElement.style.display == "flex") {
            menuElement.style.display = "none";
            menuElement.userHidden = true;
        }
        else if (menuElement.style.display == "none") {
            menuElement.style.display = "flex";
            menuElement.userHidden = false;
        }
    }
}

function changeMobVariant(mobTag, presentName) {
    var html = generateMobBlockHTML(mobTag, presentName);
    // Gotta strip away the DIV container so we don't duplicate it
    var divStripRegex = new RegExp(`[^<div id="${mobTag}" class="overheadMobBlock">](?:.|\n)*[^<\/div>$]`, "g");
    var match = html.match(divStripRegex);
    html = match[0];
    var mobBlock = document.getElementById(mobTag);
    mobBlock.innerHTML = html;

    var filtered = mobReference.filter(a => a.Name == presentName);
    var newMob = filtered[0];
    changeMobWeapon(mobTag, newMob.EquipWeapon.WeaponMods)
    if (newMob.Variants) {
        assignVariants(mobTag, newMob.Variants)
    }
    document.getElementById(mobTag + "-Weapon-Select").addEventListener('change', (e) => {
        changeMobWeapon(mobTag, e.target.value);        
    });

    assignEventsToBlock(mobTag, false) 
}

function assignEventsToBlock(mobTag, changeRow=true) {
    if (changeRow) {
        document.getElementById(mobTag).style.gridRow = blockArray.length;
    }
         
    document.getElementById(mobTag + "-Delete").addEventListener('click', () => {        
        deleteMob(mobTag);
    });
    
    document.getElementById(mobTag + "-Enabled").checked = true;
    document.getElementById(mobTag + "-Enabled").addEventListener('click', () => {        
        toggleMob(mobTag);
    });
    
    document.getElementById(mobTag + "-Minimize").checked = true;
    document.getElementById(mobTag + "-Minimize").addEventListener('click', () => {        
        minimizeMob(mobTag);
    });
    
    document.getElementById(mobTag + "-Maximize").addEventListener('click', () => {        
        minimizeMob(mobTag);
    });
         
    document.getElementById(mobTag + "-Clone").addEventListener('click', () => {        
        cloneMob(mobTag);
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
    document.getElementById(mobTag + "-ExtraAttack").addEventListener('click', (e) => {
        addExtraAttack(mobTag, e.target);        
    });
    document.getElementById(mobTag + "-Range").addEventListener('click', (e) => {
        toggleRange(e.target);
    });
         
    document.getElementById(mobTag + "-Move-Up").addEventListener('click', (e) => {
        moveMob(mobTag, "Up");
    });
    document.getElementById(mobTag + "-Move-Down").addEventListener('click', (e) => {
        moveMob(mobTag, "Down");
    });
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

function expandWeapon(mobTag, weaponNum="") {
    if (weaponNum != "") {
        weaponNum = `-${weaponNum}`;
    }

    var modRow = getNumModRows(mobTag, weaponNum); // Returns 0 if none
    var modSelect = document.getElementById(`${mobTag}-${modRow-1}-Mod-Select${weaponNum}`);
    if (!modSelect) { // If its the first additional effect, add some new buttons 
        document.getElementById(`${mobTag}-Weapon-Expand${weaponNum}`).insertAdjacentHTML('beforebegin',`<span class="weaponCollapseButton" id="${mobTag}-Weapon-Collapse${weaponNum}"><i class="fa fa-minus-square-o"></i></span>`);
        document.getElementById(`${mobTag}-Weapon-Expand-Tip${weaponNum}`).style.display = "none";
        document.getElementById(`${mobTag}-ExtraAttack-Tip${weaponNum}`).style.display = "none";  
        document.getElementById(`${mobTag}-Weapon-Collapse${weaponNum}`).addEventListener('click', (e) => {
            collapseRow(e.target.parentElement.id, weaponNum);
        });  
    }
    var underDc = checkIfUnderDc(mobTag, modRow, weaponNum);
    var newRow = modifierRow(underDc, weaponNum).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`); //example: Mob0-0-Mod-Select, or, Mob0-0-Mod
    var parentRow = document.getElementById(`${mobTag}-Weapon-Expand${weaponNum}`).parentElement.parentElement;    
    parentRow.insertAdjacentHTML('beforebegin', newRow);
         
    modifyRow("Extra Damage", mobTag, modRow, false, weaponNum);
    assignListenersToModRow(mobTag, modRow, weaponNum);
    
    return modRow;
}

function getNumModRows(mobTag, weaponNum="") {
    var count = 0;
    while (true) {
        if (document.getElementById(`${mobTag}-${count}-Mod-Select${weaponNum}`)) {
            count++;
            continue;
        }
        break;
    }
    return count;
}

// Used to force the options of a weapon mod row to change
// Weapon mod is [<type string>, <select2 string>, <DC attribute if applicable>]
function forceOption(mobTag, modRow, weaponNum, weaponMod) {
    document.getElementById(`${mobTag}-${modRow}-Mod-Select${weaponNum}`).value = weaponMod[0];
    modifyRow(weaponMod[0], mobTag, modRow, true, weaponNum); // Assigns the options for the second cell

    document.getElementById(`${mobTag}-${modRow}-Mod${weaponNum}`).value = weaponMod[1];
    if (weaponMod[2]) {
        document.getElementById(`${mobTag}-${modRow}-Mod-Dc${weaponNum}`).value = weaponMod[2];
    }

    assignListenersToModRow(mobTag, modRow, weaponNum); 
}

function assignListenersToModRow(mobTag, modRow, weaponNum="") {
    var modSelect = document.getElementById(`${mobTag}-${modRow}-Mod-Select${weaponNum}`);
    modSelect.addEventListener('change', (e) => {
        modifyRow(e.target.value, e.target.id.split("-")[0], e.target.id.split("-")[1].split("-")[0], false, weaponNum);
    });  
}

// Based on what kind of row this is, assigns options for the second (and maybe 3rd) cell in the row
function modifyRow(value, mobTag, modRow, automated=false, weaponNum="") {
    var targetCell = document.getElementById(`${mobTag}-${modRow}-Mod${weaponNum}`);    
    targetCell.parentElement.innerHTML = chooseModifierType(value, mobTag, modRow, weaponNum);
    if (value == "DC") {
        document.getElementById(`${mobTag}-${modRow}-Mod${weaponNum}`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
    } else {
        document.getElementById(`${mobTag}-${modRow}-Mod${weaponNum}`).parentElement.parentElement.style.backgroundColor = "transparent"
    }
    updateModDcGrouping(value, mobTag, modRow, automated, weaponNum);
}

function checkIfUnderDc(mobTag, modRow, weaponNum="") {
    for (var i = modRow-1; i >= 0; i--) {
        var selectSeek = document.getElementById(`${mobTag}-${i}-Mod-Select${weaponNum}`);
        if (selectSeek.value == "DC") {
            return true;          
        }
    }
    return false;
}

// Updates DC grouping/ungrouping
function updateModDcGrouping(value, mobTag, modRow, automated=false, weaponNum="") {
    // If it falls under a DC, mark it as so
    if (checkIfUnderDc(mobTag, modRow, weaponNum)) {
        document.getElementById(`${mobTag}-${modRow}-Mod${weaponNum}`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
    }
    else if ((+modRow + 1) == getNumModRows(mobTag, weaponNum) && (value == "DC") && !automated) {
        // User created DC on the last available row. Create a new row to help them out
        var modRow = expandWeapon(mobTag, weaponNum.substr(1));
        forceOption(mobTag, modRow, weaponNum, ["Condition", "Knock Prone"]);
    }
    else {
        // Scan down - if value is DC mark all below as DC, if its not mark all below as not until we hit DC
        while(true) {
            modRow++;
            var seekMod = document.getElementById(`${mobTag}-${modRow}-Mod-Select${weaponNum}`);
            if (seekMod) {
                if (seekMod.innerHTML.includes("DC") && value == "DC") { // Not marked as under DC, but under focus row which is DC
                     // fix the selection
                    var rowReplace = seekMod.parentElement.parentElement;
                    rowReplace.innerHTML = modifierRow(true, weaponNum).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`);
                    modifyRow("Damage (1/2 on save)", mobTag, modRow, false, weaponNum=weaponNum);
                    document.getElementById(`${mobTag}-${modRow}-Mod-Select${weaponNum}`).parentElement.parentElement.style.backgroundColor = mobBlockDcColor;
                    assignListenersToModRow(mobTag, modRow, weaponNum);
                }
                else if (!seekMod.innerHTML.includes("DC") && value != "DC") { // Marked as under DC, but under focus row which is not DC
                    // Fix row
                    var rowReplace = seekMod.parentElement.parentElement;
                    rowReplace.innerHTML = modifierRow(false, weaponNum).replace(/FILLER-BLOCK/g, `${mobTag}-${modRow}`);
                    modifyRow("Extra Damage", mobTag, modRow, false, weaponNum=weaponNum);
                    document.getElementById(`${mobTag}-${modRow}-Mod-Select${weaponNum}`).parentElement.parentElement.style.backgroundColor = "transparent";
                    assignListenersToModRow(mobTag, modRow, weaponNum);
                }               
                else { break; }
            }       
            else { break; }            
        }
    }         
    checkForExistingDc();
}

// Checks all mobs to see if any have use a DC. For the sake of visual notifications
function checkForExistingDc() {
    var result = scanAllMobs();
    if (result) {
        [...document.getElementsByClassName("savingThrowNotification")].forEach(a => a.style.display = "inline-block");
    }
    else {
        [...document.getElementsByClassName("savingThrowNotification")].forEach(a => a.style.display = "none");
    }
}

// Looks for DC on any mobs
function scanAllMobs() {
    for (var i=0; i < blockArray.length; i++) {
        var rowCounter = 0;
        while (true) {
            var element = document.getElementById(`${blockArray[i]}-${rowCounter}-Mod-Select`);
            if (!element) {
                break;
            }
            else if (element.value == "DC") {
                return true;
            }           
            rowCounter++;
        }
    }
    return false;
}

// Expects ID of collapse button
function collapseRow(id, weaponNum="") {
    var prevTr = document.getElementById(id).parentElement.parentElement.previousElementSibling;    
    prevTr.remove();
    prevTr = document.getElementById(id).parentElement.parentElement.previousElementSibling;
    var mobTag = id.split("-")[0];
    
    // If we just deleted the only child of a DC, clean up the DC header too
    if (prevTr.children[1].firstElementChild) {
        if (prevTr.children[1].firstElementChild.value == "DC") {
            prevTr.remove()
            prevTr = document.getElementById(id).parentElement.parentElement.previousElementSibling;
        } 
    }
    
    if (prevTr.children[2].firstElementChild.id == `${mobTag}-Weapon${weaponNum}`) {
        document.getElementById(id).remove();
        document.getElementById(`${mobTag}-Weapon-Expand-Tip${weaponNum}`).style.display = "inline-block";
        document.getElementById(`${mobTag}-ExtraAttack-Tip${weaponNum}`).style.display = "inline-block";
    }
    
    checkForExistingDc()              
}

function addExtraAttack(mobTag, element=null) {
    var weaponNum = findNumberOfWeaponsInBlock(mobTag);
    var weaponMenuHtml = document.getElementById(`${mobTag}-Weapon-Select`).outerHTML;
    weaponMenuHtml = weaponMenuHtml.replace(`${mobTag}-Weapon-Select`, `${mobTag}-Weapon-Select-${weaponNum}`);

    var style = `background-color: rgba(100, 100, 100, ${weaponNum * .15})`;
    
    var htmlToHitInsert = `<tr style="${style}"><td><button id="${mobTag}-Weapon-Delete-${weaponNum}" class="weaponDeleteButton"><i class="fa fa-trash-o"></i></button></td><td>Bonus To Hit:</td><td><input id="${mobTag}-ToHit-${weaponNum}" type="number" value="0"></td></tr>`;
    var htmlWeaponInsert = `<tr style="${style}"><td>${weaponMenuHtml}</td><td>Weapon:</td><td><input id="${mobTag}-Weapon-${weaponNum}" type="text" value="0" title="Recommended format is XdX +/- X"></td></tr>`;
    var menuRow = document.getElementById(`${mobTag}-Weapon-Expand`).parentElement.parentElement;
    menuRow.insertAdjacentHTML('afterend', weaponMenu(mobTag, weaponNum));
    menuRow.nextElementSibling.style = style;
    menuRow.insertAdjacentHTML('afterend', htmlWeaponInsert);
    menuRow.insertAdjacentHTML('afterend', htmlToHitInsert);
    
    // var findNum = weaponNum > 0 ? "" : `-${weaponNum}`;
    // document.getElementById(`${mobTag}-ExtraAttack${findNum}`).style.display = "none"; // Hide the old button

    var defaultWeapon = document.getElementById(`${mobTag}-Weapon-Select-${weaponNum}`).options[1].value;
    changeMobWeapon(mobTag, defaultWeapon, weaponNum); 

    assignEventsToNewWeapon(mobTag, weaponNum);
}

function assignEventsToNewWeapon(mobTag, weaponNum) {
    document.getElementById(`${mobTag}-Weapon-Expand-${weaponNum}`).addEventListener('click', (e) => {
        expandWeapon(mobTag, weaponNum);        
    });
    document.getElementById(`${mobTag}-ExtraAttack-${weaponNum}`).addEventListener('click', (e) => {
        addExtraAttack(mobTag, e.target);        
    });
    document.getElementById(`${mobTag}-Range-${weaponNum}`).addEventListener('click', (e) => {
        toggleRange(e.target);
    });
    document.getElementById(`${mobTag}-Weapon-Select-${weaponNum}`).addEventListener('change', (e) => {
        changeMobWeapon(mobTag, e.target.value, weaponNum);        
    });
    document.getElementById(`${mobTag}-Weapon-Delete-${weaponNum}`).addEventListener('click', (e) => {
        deleteMobWeapon(mobTag, weaponNum);
    });
    // document.getElementById(`${mobTag}-Weapon-Delete-${weaponNum}`).onmouseenter = highlightMobWeapon(mobTag, weaponNum);
    // });
    // document.getElementById(`${mobTag}-Weapon-Delete-${weaponNum}`).parentElement.addEventListener('onmouseleave', (e) => {
    //     unHighlightMobWeapon(mobTag, weaponNum);
    // });
        
}

// Returns the number of weapon rows on the mob block
function findNumberOfWeaponsInBlock(mobTag) {
    var count = 1;
    while (true) {
        if (document.getElementById(`${mobTag}-Weapon-${count}`)) {
            count++;
            continue;
        }
        break;
    }
    return count;
}

function getMobWeaponElements(mobTag, weaponNum) {
    var elementsToReturn = [];
    elementsToReturn.push(document.getElementById(`${mobTag}-Weapon-Delete-${weaponNum}`).parentElement.parentElement);
    elementsToReturn.push(document.getElementById(`${mobTag}-Weapon-${weaponNum}`).parentElement.parentElement);
    elementsToReturn.push(document.getElementById(`${mobTag}-Weapon-Expand-${weaponNum}`).parentElement.parentElement);
    var modCount = 0;
    while (true) {
        if (document.getElementById(`${mobTag}-${modCount}-Mod-Select-${weaponNum}`)) {
            elementsToReturn.push(document.getElementById(`${mobTag}-${modCount}-Mod-Select-${weaponNum}`).parentElement.parentElement);
            modCount++;
        } else {
            break;
        }
    }
    return elementsToReturn;
}

function highlightMobWeapon(mobTag, weaponNum) {
    var elementsToHighlight = getMobWeaponElements(mobTag, weaponNum);
    for (element in elementsToHighlight) {
        element.style.backgroundColor = "rgba(255, 50, 50, .05)";
    }    
}

function unHighlightMobWeapon(mobTag, weaponNum) {
    var elementsToHighlight = getMobWeaponElements(mobTag, weaponNum);
    for (element in elementsToHighlight) {
        element.style.backgroundColor = "transparent";
    }    
}

function deleteMobWeapon(mobTag, weaponNum) {
    var elementsToDelete = getMobWeaponElements(mobTag, weaponNum);
    for (var i=elementsToDelete.length - 1; i >= 0; i--) {
        elementsToDelete[i].remove();
    }
}

function changeMobWeapon (mobTag, weaponMods, weaponNum="") {
    if (typeof weaponMods == "string") {
        weaponMods = weaponMods.replace(/'/g, "\"");
        weaponMods = JSON.parse(weaponMods)
    }

    if (weaponNum != "") {
        weaponNum = `-${weaponNum}`;
    }
    
    // clean up existing rows
    while(true) {
        var numModRows = getNumModRows(mobTag, weaponNum);
        if (numModRows == 0) {
            break;
        }
        else {
            collapseRow(`${mobTag}-Weapon-Collapse${weaponNum}`, weaponNum);
        }
    }
            
    var toHit = weaponMods[0][1];
    var weapon = weaponMods[2][1];
    var isMelee = weaponMods[1][1];
    document.getElementById(`${mobTag}-ToHit${weaponNum}`).value = toHit;
    document.getElementById(`${mobTag}-Weapon${weaponNum}`).value = weapon;    
    setRange(mobTag, isMelee, weaponNum)   
    
    for (var i=3; i < weaponMods.length; i++) {
        expandWeapon(mobTag, weaponNum.substr(1))
        forceOption(mobTag, i-3, weaponNum, weaponMods[i]);                
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
        shiftMobBlockColors(mobTag, mobBlockAdvantageColor);
    }
    else if (!adv && dis) {
        shiftMobBlockColors(mobTag, mobBlockDisadvantageColor);
    }
    else {
        shiftMobBlockColors(mobTag, mobBlockDefaultColor);
    }
   
}

function shiftMobBlockColors(mobTag, color) {
    var mobBlock = document.getElementById(mobTag);
    mobBlock.children[1].style.backgroundColor = color;
    
    for(var i=0; i < mobBlock.children[1].firstElementChild.childElementCount; i++) {
        var scanColor = mobBlock.children[1].firstElementChild.children[i].style.backgroundColor;
        if (scanColor != "") {
            var red = parseInt(color.substring(1,3), 16);
            var green = parseInt(color.substring(3,5), 16);
            var blue = parseInt(color.substring(5,7), 16);
            
            red = Math.max(red - 75, 0);
            green = Math.max(green - 75, 0);
            blue = Math.max(blue - 75, 0);
            
            mobBlock.children[1].firstElementChild.children[i].style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
        }
    }
    
}

function throwError(msg) {
    var infoAreaDiv = document.getElementById("infoAreaDiv");
    var infoArea = document.getElementById("infoArea");

    
    infoArea.innerHTML = `<div id="errorMessage">${msg}</div>`;
    infoArea.style.display = "inline-block";
    infoAreaDiv.style.display = "inline-block";

    document.getElementById("discoveryArea").innerHTML = "";
}

function toggleDetails(event, rollArray) {
    var mobTag = event.target.id.split("-")[0];
    var detailElement = document.getElementById(mobTag + "-Details");
    if (detailElement == null) {
        var detailAppend = `<div id="${mobTag}-Details" style="cursor:auto"><table class="detailTable" style="margin-left: 15px; border-collapse: collapse">`;
        detailAppend += `<tr class="detailHeader">`;
        for (var i=0; i < rollArray.length; i++) {
            var selectedCreature = rollArray[i][0].attacker;            
            var mobBlockRolls = [];
            if (selectedCreature.MobName == mobTag) {
                mobBlockRolls = rollArray[i];
                if (selectedCreature.Multiattack) {
                    detailAppend += `<td>Creature</td>`;
                }
                detailAppend += `<td>Rolls</td><td>Damage</td><td>Notes</td></tr>`;
            }
            else {
                continue;
            }
            
            // Sort array based on number
            mobBlockRolls.sort(function(a, b) {return a.attacker.Number - b.attacker.Number});
            
            for (var j=0; j < mobBlockRolls.length; j++) {
                var rollClass = mobBlockRolls[j];                
                var superConditionColor = "";
                var damageIcon = rollClass.attacker.EquipWeapon[1][1] == true ? "fa fa-gavel" : "fa fa-crosshairs";

                var superConditionColor = "";
                if (rollClass.crit && !rollClass.missed) {
                    superConditionColor = "color:#b59800";
                }
                else if (rollClass.crit && rollClass.missed) {
                    superConditionColor = "color:#b00000"                      
                }
                else if (!rollClass.crit && rollClass.missed) {
                    superConditionColor = "color:#914014"                      
                }
                else if (rollClass.autoCrit) {
                    superConditionColor = "color:#a6b500";
                }
                
                var creatureColumn = ""
                if (rollClass.attacker.Multiattack) {
                    if (j % rollClass.attacker.Multiattack == 0) {
                        creatureColumn = `<td rowspan="${rollClass.attacker.Multiattack}"><span class="creatureGroup">${rollClass.attacker.Number}</span></td>`;
                    }
                }

                var diceRollsDisplay = getDiceRollOutput(rollClass)

                var damageTotalsDisplay = "";
                if (!rollClass.missed) {
                    for (var dmg=0; dmg < rollClass.damageResults.length; dmg++) {
                        damageTotalsDisplay += `<span class="damageRoll"><span id="${rollClass.attacker.Name}-${rollClass.attacker.Number}-DamageRoll-${dmg}"> 
                                                    <i class="${damageIcon}" style="font-size: 13px; margin-right: 1px"></i>${rollClass.damageResults[dmg][0]}
                                                </span>
                                                <span class="damageRollTip" id="${rollClass.attacker.Name}-${rollClass.attacker.Number}-DamageRoll-${dmg}-Details">
                                                    ${rollClass.rollBreakdown[dmg]}
                                                </span></span>`;
                                
                    }
                        
                }
                else if (rollClass.missed && rollClass.crit) {
                    damageTotalsDisplay = "-";
                    rollClass.message = "Crit Miss!";
                }
                else {
                    damageTotalsDisplay = "-";
                    rollClass.message = "Miss";
                }
                
                var message = "";
                if (rollClass.message != "") {
                    message = rollClass.message;
                }
                
                detailAppend += `<tr class="attackDetail" style="${superConditionColor}">${creatureColumn}<td>${diceRollsDisplay}</td> <td>${damageTotalsDisplay}</td><td>${message}</td></tr>`;
                    
                
            }
        }   
        detailAppend += "</table></div>";
        var tag = mobTag + "-Result";
        document.getElementById(tag).insertAdjacentHTML('beforeend', detailAppend);
         
        document.getElementById(`${mobTag}-Caret`).classList = "fa fa-caret-down";
    }
    else {
        detailElement.remove();
        document.getElementById(`${mobTag}-Caret`).classList = "fa fa-caret-right";
    }
}

function getDiceRollOutput(rollClass) {
    var rollsOrder = [];
    if (rollClass.vantage >= 1) {
        rollsOrder = [Math.max(rollClass.attackRoll1, rollClass.attackRoll2), Math.min(rollClass.attackRoll1, rollClass.attackRoll2)]                        
    }
    else if (rollClass.vantage <= -1) {
        rollsOrder = [Math.min(rollClass.attackRoll1, rollClass.attackRoll2), Math.max(rollClass.attackRoll1, rollClass.attackRoll2)]                        
    }
                                            
    var diceRollsDisplay = "";
    var bonusToHit = +rollClass.attacker.EquipWeapon[0][1];
    if (rollsOrder.length > 0) {
        var vantageColor = rollClass.vantage >= 1 ? "#004713" : "#470200";
        diceRollsDisplay = `<table style="width: 100%">
                                <tr>
                                    <td class="hitRoll">
                                        <span style="color:${vantageColor}">
                                            [${+rollsOrder[0] + bonusToHit}]
                                        </span>
                                        <span class="hitRollTip">
                                            🎲${rollsOrder[0]} + ${bonusToHit}
                                        </span>
                                    </td>
                                    <td class="hitRoll">
                                        <span style="color:lightgrey">
                                            [${+rollsOrder[1]  + bonusToHit}]
                                        </span>
                                        <span class="hitRollTip">
                                            🎲${rollsOrder[1]} + ${bonusToHit}
                                        </span>
                                    </td>
                                </tr>
                                </table>`;
    }
    else {
        diceRollsDisplay = `<span class="hitRoll"><span>[${+rollClass.attackRoll1 + bonusToHit}]</span>
                                <span class="hitRollTip">
                                      🎲${rollClass.attackRoll1} + ${bonusToHit}
                                </span></span>`;
    }
    return diceRollsDisplay;
}

async function launchAttack() {
    var rollArray = [];
    var numCrits = 0;       
    var numBlocks = blockArray.length;              
    
    document.getElementById("infoAreaDiv").style.display = "none";
    resetPromptNotificationHighlighting();
    randomizeAttackButton();
         
    if (numBlocks == 0){
        throwError("There are no mobs available to attack with!");
        document.getElementById("infoAreaDiv").style.display = "inline-block";
        return;
    }    
    
    var mobArray = parseMobs(numBlocks);
    if (!mobArray) {
        return false;
    }
    
    // Gather user set variables
    var targetAc = document.getElementById('targetAc').value;
    var critImmune = document.getElementById('critImmune').checked;
    var dmSaves = document.getElementById('dmSaves').checked;
    
    // discovery is for when we don't know the target AC, it will step the attacks sequentially until we figure it out
    var discoveryModeFlag = false;
    if (targetAc <= 0) {
        discoveryModeFlag = true;
        var minAc = -1;
        var lowerCap = -1
    }
    var dcSaves = {};   
    var ailments = {};
         
    var existingAilments = document.getElementById(`targetCondition`).value;
    ailments[existingAilments] = true;
    
    // Go through the array of mob objects we created in parseMobs()
    for (var block=0; block < mobArray.length;block++) {
        rollArray[block] = new Array();
        for (var i=0; i < mobArray[block].length; i++) {                                    
            document.getElementById("discoveryArea").innerHTML = ""; // Cleanup prompt space at start of rolls
            var newCreature = mobArray[block][i];
            var creatureNotes = new CreatureNotes();

            // Pass this functions any global variables it needs
            // performCreatureAttack(newCreature, creatureNotes, ailments);

            var vantageResult = determineCreatureVantage(newCreature, ailments);
            newCreature = vantageResult[0];
            var allowParalyzeCrit = vantageResult[1]; 

            var rollResult = "";
            var hitTarget = false;
            var attackRollClass = newCreature.makeAttack();
            
            // Determine if attack hits or not
            // rollResult = determineAttack(attackRollClass); // Returns {"crit":true/false, "miss":true/false, "rollResult":string, }
            
            var attackRoll = attackRollClass.hitRoll;
            
            if (attackRollClass.crit && !attackRollClass.missed && !critImmune) {
                rollResult = newCreature.dealCrit();
                numCrits = numCrits + 1;
                hitTarget = true;
            }
            else if (attackRollClass.crit && attackRollClass.missed) { // A crit flag + a miss flag = a critical miss
                rollArray[block].push(newCreature.miss());
                continue;
            }
            else if (discoveryModeFlag) { // Discovery mode intercepts the natural flow of things here             
              if (attackRoll <= lowerCap) { // Auto assign miss to anything lower than a declared miss
                  rollArray[block].push(newCreature.miss());
                  continue;
              } 
              if (attackRoll < minAc || minAc == -1) { // If we're unsure if it hit or not, or its our first time here, prompt
                  var response = await discoveryStep(attackRoll, attackRollClass.attacker.EquipWeapon[0][1], attackRollClass.attacker);
                  if (response) {
                      rollResult = newCreature.dealDamage();
                      hitTarget = true;
                      minAc = attackRoll;
                  }
                  else {
                      if (attackRoll > lowerCap) {
                          rollArray[block].push(newCreature.miss());
                          lowerCap = attackRoll;
                          continue;
                      }
                  }
              }
              else {
                  rollResult = newCreature.dealDamage();
                  hitTarget = true;
              }                
            }
            else if (attackRoll >= targetAc) {                
                rollResult = newCreature.dealDamage();
                hitTarget = true;
            }
            else { //Assuming this is a miss
                rollArray[block].push(newCreature.miss());
                continue;
            }
         
            // On a hit, assign an autocrit if the target is already paralyzed, and assign it any automatic on hit conditions
            if (hitTarget) {
                if (allowParalyzeCrit && !attackRollClass.crit && !critImmune) {
                    newCreature.purgeDamageResults(); // Clear that basic hit we just made, this is a crit!
                    rollResult = newCreature.dealCrit();
                    rollResult.crit = false;
                    rollResult.autoCrit = true;
                    numCrits = numCrits + 1;
                }

                var nonDcConditions = newCreature.getNonDcConditions();
                if (nonDcConditions.length > 0) {
                    for (var cond=0; cond < nonDcConditions.length; cond++) {                        
                        if (!(nonDcConditions[cond] == "Knock Prone" && ailments[nonDcConditions[cond]])) {                        
                            ailments[nonDcConditions[cond]] = true;
                            creatureNotes.addInfliction(nonDcConditions[cond]);
                        }
                    }
                }                
            }

            // Everything past here is assumed to take part on a hit
            // =============== DC LOGIC ==================                                    
            
            var mobDcInfo = newCreature.checkIfHasDc();
            if (mobDcInfo != false) { // If there is a DC included somewhere in the mob block
                var dcType = mobDcInfo[1];
                var savingThrow = null;
                var roll = Math.floor(Math.random() * 20 + 1);
                var autoFailSave = false;
                
                if (ailments["Restrain"] && dcType == "Dex") { // Gives Disadvantage to dex saves
                    var roll2 = Math.floor(Math.random() * 20 + 1);
                    roll = Math.min(roll, roll2);
                }
                if (ailments["Paralyze"] && (dcType == "Dex" || dcType == "Str")) { // Auto fails str and dex saves
                    autoFailSave = true;
                }
                     
                if (usingSavingThrowMods) {
                    var savingMod = null;
                    if (dcType == "Str") {
                        savingMod = document.getElementById("targetStrSave").value;
                    }
                    else if (dcType == "Dex") {
                        savingMod = document.getElementById("targetDexSave").value;
                    }
                    else if (dcType == "Con") {
                        savingMod = document.getElementById("targetConSave").value;
                    }
                    else if (dcType == "Int") {
                        savingMod = document.getElementById("targetIntSave").value;
                    }
                    else if (dcType == "Wis") {
                        savingMod = document.getElementById("targetWisSave").value;
                    }
                    else if (dcType == "Chr") {
                        savingMod = document.getElementById("targetChrSave").value;
                    }
                                       
                    savingThrow = (roll + +savingMod) >= mobDcInfo[0];                    
                }
                     
                // DC Prompt Logic
                if (!dcSaves[dcType]) {
                    dcSaves[dcType] = {"dcLowestSave": -1, "dcHighestFail": -1};
                }
                var dcLowestSave = dcSaves[dcType]["dcLowestSave"];
                var dcHighestFail = dcSaves[dcType]["dcHighestFail"];
                     
                     
                if (((roll < dcLowestSave || dcLowestSave == -1) && (roll > dcHighestFail) && !autoFailSave && !usingSavingThrowMods) || dmSaves) {                    
                    savingThrow = await promptDc(`DC: ${mobDcInfo[0]} ${dcType}`, roll, mobDcInfo[0], attackRollClass.attacker, dmSaves);
                }
                else if (roll >= dcLowestSave && !usingSavingThrowMods && !autoFailSave) {
                    savingThrow = true;
                }
                else if (roll <= dcHighestFail || autoFailSave) {
                    savingThrow = false;
                }
                if (!savingThrow) {
                    if (roll > dcHighestFail || dcHighestFail == -1) {
                        dcSaves[dcType]["dcHighestFail"] = roll;
                    }
                    var failureResults = newCreature.failDc(); // Changes to make after a dc fail
                    for (var fail=0; fail < failureResults.length; fail++) {
                        var effectType= failureResults[fail][0];
                        var conditionName = failureResults[fail][1];
                        if (effectType == "Condition") {
                            
                            if (conditionName == "Knock Prone") { // Prone cant stack so don't track it more than once
                                if (!ailments[conditionName]) {
                                    ailments[conditionName] = true;
                                    creatureNotes.addInfliction(conditionName);
                                }
                            }
                            else {
                                ailments[conditionName] = true;
                                creatureNotes.addInfliction(conditionName);
                            }
                        }
                        else if (effectType == "Roll Class") {
                            rollResult = conditionName;
                        }
                    }
                }
                else {
                    if (roll < dcLowestSave || dcLowestSave == -1) {
                        dcSaves[dcType]["dcLowestSave"] = roll;
                    }
                    rollResult = newCreature.succeedDc();                         
                }
            }

            rollResult.message += creatureNotes.printInflictions();
                       
            rollArray[block].push(rollResult);
            if (rollResult.error) {                  
                  throwError(rollResult.message);
                  return;
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
        var attacker = rollArray[block][0].attacker;
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
        var numOfBlockCrits = rollArray[block].filter(a => (a.crit || a.autoCrit) && !a.missed && !critImmune).length;
             
        totalHits += blockNumHits;
        infoAppend += `<div class="mobHeader" id="${attacker.MobName}-Result"> <i id="${attacker.MobName}-Caret" class="fa fa-caret-right"></i> ${attacker.Icon} ${attacker.Name} : ${blockNumHits} hits`;
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

    generateFinalOutput(infoAppend, numBlocks, totalDamageBreakdown, totalDamage, totalHits, numCrits, rollArray, ailments); 

}

function determineCreatureVantage(newCreature, ailments, inMelee) {
    var advantage = 0;
    var disadvantage = 0;
    var allowParalyzeCrit = false;
    var inMelee = document.getElementById(`${newCreature.MobName}-Range`).checked;

    if (ailments["Knock Prone"]) {
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
    
    newCreature.Vantage += advantage + disadvantage; // [-1,0,1] += [-1,0,1]   
    return [newCreature, allowParalyzeCrit];
}

// Parses through all the html mob blocks and converts them into Mob classes usable by the algorithm
// Returns an array [[]] filled with Mob objects
function parseMobs(numBlocks) {
    var mobArray = []; // 2d arrays: Block type, attacks of that block    

    // Go though each creature block, spawn a number of mobs with those stats
    for(var i=0;i < numBlocks;i++) {
        //Name, Icon, to hit, weapon, number
        var mobTag = blockArray[i];
        mobArray.push(createMobsFromBlock(mobTag));        
    }
    return mobArray;
}

// Collects all weapon mods and returns them in an array
function getWeaponSet(mobTag, weaponNum="") {
    if (weaponNum != "") {    
        weaponNum = `-${weaponNum}`;
    }

    var toHit = document.getElementById(mobTag + `-ToHit${weaponNum}`).value;
    var weapon = document.getElementById(mobTag + `-Weapon${weaponNum}`).value;
    var isMelee = document.getElementById(mobTag + `-Range${weaponNum}`).checked;
    
    //Run weapon error check
    var errorCheck = checkIfValidWeapon(weapon, mobTag);
    if (errorCheck) {
        throwError(errorCheck);
        return;
    }

    var ret = [["ToHit", toHit],  ["IsMelee", isMelee], ["Weapon", weapon]];
    var rowCount = 0
    while(true) {
        var modSelect = document.getElementById(`${mobTag}-${rowCount}-Mod-Select`);
        if (modSelect) {
            var mod = document.getElementById(`${mobTag}-${rowCount}-Mod`);
            if (modSelect.value == "DC") {
                ret.push([modSelect.value, mod.value, document.getElementById(`${mobTag}-${rowCount}-Mod-Dc`).value]);
            }
            else {
                if (modSelect.value.includes("Damage")) {
                    errorCheck = checkIfValidWeapon(mod.value, mobTag);
                    if (errorCheck) {
                        throwError(errorCheck);
                        return;
                    }
                }
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

function checkIfValidWeapon(weaponString, mobTag) {
    var testMob = new Mob();

    var errorResult = testMob.parseWeapon(weaponString);
    if (errorResult["errorMessage"]) {
        var mobName = document.getElementById(`${mobTag}-Name`).value;
        return `An error occurred when trying to parse the weapon input under Mob name: ${mobName}`;
    }
    else {
        return false;
    }    
}

function generateFinalOutput(infoAppend, numBlocks, totalDamageBreakdown, totalDamage, totalHits, numCrits, rollArray, ailments) {
    // Activate the info box
    document.getElementById("infoAreaDiv").style.display = "inline-block";
    document.getElementById("resultsNotification").style.color = "white";
         
    var header = `<div id="resultOverview">`;
    header += `<div class="infoCloseButton" id="infoCloseButton">&times</div>`              
    
    if (totalDamage > 0) {        
        header += `<div id="totalDamageTitle" title="${displayBreakdown(totalDamageBreakdown)}" style="cursor:help">${totalDamage} total damage dealt`;
        header += `<br><span class="mobile-display" style="font-size:smaller">(${displayBreakdown(totalDamageBreakdown)})</span>`;
    }
    else {
        header += `<div id="totalDamageTitle">All attacks missed!`;
    }

    header += "</div>";
    header += `<div id="hitsOverview">${totalHits} attacks landed <br>`;
    if (numCrits > 0) {
        header += `<b style="color:gold">${numCrits} crits! </b><br>`;
    }
    header += "</div>";
    var ailmentKeys = Object.keys(ailments);
    if (ailmentKeys.length > 1) {
        header += `<div id="ailmentsOverview">Inflicted target with: `;
        for(var i=0; i < ailmentKeys.length; i++) {
            if (ailmentKeys[i] != "None") {
                header += `${ailmentKeys[i]}`;
                if (i < ailmentKeys.length - 1) {
                    header += `, `;
                }
            }
        }
        header += `</div>`;
    }
    header += "</div>";
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
    // And dont forget the close button event!
    document.getElementById("infoCloseButton").addEventListener('click', (event) => {
        event.currentTarget.parentElement.parentElement.parentElement.style.display = "none";
        resetPromptNotificationHighlighting();
    });
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

async function discoveryStep(attackRoll, toHit, attacker) {
  // spawn the block and wait for user input
  document.getElementById("hitRollNotification").style.color = "white";
  document.getElementById("hitRollNotificationMobile").style.color = "white";
  return new Promise((resolve, reject) => {    
    var option1 = "Hit!";
    var option2 = "Miss";
    var rollInfo = `🎲${attackRoll-toHit} + ${toHit}`;
    attackRoll = `${attackRoll}`;
    var attackerInfo = `${attacker.Icon} ${attacker.Name} #${attacker.Number}`;
    document.getElementById("discoveryArea").insertAdjacentHTML('beforeend', discoveryTemplate("To Hit", rollInfo, attackRoll ,attackerInfo, option1, option2));           

    document.getElementById(`hitButton-${option1}`).addEventListener("click", (e) => {      
      resolve(true);
      resetPromptNotificationHighlighting();
    });
    document.getElementById(`missButton-${option2}`).addEventListener("click", (e) => {
      resolve(false);
      resetPromptNotificationHighlighting();
    });
    document.getElementById(`acInfoButton`).addEventListener("click", (e) => {
      alert(`
This prompt appeared because the Target AC was set to 0 or lower.
Work with your DM to determine if the creature hit the target.
During the same attack, the  tool will automatically determine if attacks hit or miss based on your previous input.`);
    });
  });
}

async function promptDc(dcInfo, roll, dc, attacker, dmSaves) {
  document.getElementById("savingThrowNotification").style.color = "white";
  document.getElementById("savingThrowNotificationMobile").style.color = "white";
  return new Promise((resolve, reject) => {  
    var option1 = "Success";
    var option2 = "Failure";
    var bias = dc > roll ? 2 : 1;
           
    roll = `🎲${roll} + ?`;
    var attackerInfo = `${attacker.Icon} ${attacker.Name} #${attacker.Number}`;
    if (!dmSaves) {
        document.getElementById("discoveryArea").insertAdjacentHTML('beforeend', dcTemplate("Saving Throw", dcInfo, roll, attackerInfo, option1, option2, bias, dmSaves));
    } else {
        document.getElementById("discoveryArea").insertAdjacentHTML('beforeend', dcTemplateDmSaves("Saving Throw", dcInfo, attackerInfo, option1, option2));
    }

    document.getElementById(`hitButton-${option1}`).addEventListener("click", () => {
      resolve(true);
      resetPromptNotificationHighlighting();
    });
    document.getElementById(`missButton-${option2}`).addEventListener("click", () => {
      resolve(false);
      resetPromptNotificationHighlighting();
    });
    if (!dmSaves) {
        document.getElementById(`dcInfoButton`).addEventListener("click", (e) => {
        alert(`
    This prompt appeared because the tool does not know what the targets saving throw modifiers are.
    The number displayed is a roll on a d20, ask your DM if that number combined with the targets modifiers is enough to save against the DC.
    During the same attack, the tool will automatically determine future saves of the same kind based on your previous input.`);
        });
    } else {
        document.getElementById(`dcInfoButton`).addEventListener("click", (e) => {
            alert(`
This prompt appeared because the tool does not know what the targets saving throw modifiers are.
Ask your DM if the target saved or failed their saving throw, and click the corresponding button here.`);
            });
    }

  });
}

function resetPromptNotificationHighlighting() {
    document.getElementById("resultsNotification").style.color = "rgb(101, 129, 156)";

    var hitRollNotes = document.getElementsByClassName("hitRollNotification");
    for (var x of hitRollNotes) {
        if (x.className.includes("notification")) {
            x.style.color = "";
        }
    }
    
    var savingThrowNotes = document.getElementsByClassName("savingThrowNotification");
    for (var x of savingThrowNotes) {
        if (x.className.includes("notification")) {        
            x.style.color = "";
        }
    }
}

function randomizeAttackButton() {
    var generateDecision = Math.floor(Math.random() * Math.floor(4));                  
    var sentence = "";
    
    if (generateDecision == 0) {
        sentence = getRandomValueFromArray(standalonePhrases());
    }
    else {        
        sentence += getRandomValueFromArray(actionWords());
        sentence += " The ";
        sentence += getRandomValueFromArray(badGuyNames());
        sentence += "!"
        console.log(sentence);
    }
    document.getElementById("goButton").innerText = sentence;
    document.getElementById("goButton-mobile").innerText = sentence;
}

function getRandomValueFromArray(array) {
    var length = array.length;
    var randomInt = Math.floor(Math.random() * Math.floor(length));
    var word = array[randomInt];
    return word;
}


