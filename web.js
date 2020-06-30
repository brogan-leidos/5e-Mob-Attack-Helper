import Mob from './presents/Mob.js'
import {mobBlock} from './templates/Mob-Block.js'
import Weapon from './presents/Weapon.js'
import DamageRoll from './presents/DamageRoll.js'
import Skeleton from './presents/Skeleton.js'
import Zombie from './presents/Zombie.js'
import Ghoul from './presents/Ghoul.js'


var mobIncrement = 0;
var blockArray = [];

export default () => {    
    
    var casterProficiency = document.getElementById('casterProficiency');
    var targetAc = document.getElementById('targetAc');
        
    var mobBlockArea = document.getElementById('mobBlockArea');
    var infoArea = document.getElementById('infoArea'); // Debug info and roll info

    var addBlankButton = document.getElementById('addBlank');
    var skeletonButton = document.getElementById('addSkeleton');
    var zombieButton = document.getElementById('addZombie');
    var ghoulButton = document.getElementById('addGhoul');
    
    var goButton = document.getElementById('goButton');
    
    addBlankButton.addEventListener('click', () => {
        createPresent("");
    });
    
     skeletonButton.addEventListener('click', () => {
        createPresent("Skeleton");
    });

    zombieButton.addEventListener('click', () => {
        createPresent("Zombie");
    });
    
    ghoulButton.addEventListener('click', () => {
        createPresent("Ghoul");
    }); 
    
    goButton.addEventListener('click', () => {        
        launchAttack();
    }); 
    
    
};


function createPresent(presentName) {
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
   else {
       appendBlock = appendBlock.replace(/FILLER-BLOCK/g, "Mob".concat(mobIncrement.toString()));
       appendBlock = appendBlock.replace("FILLER-NAME", "Mob".concat(mobIncrement.toString()));
       blockArray.push("Mob".concat(mobIncrement.toString()));
       mobIncrement++;
       
       appendBlock = appendBlock.replace("FILLER-WEAPON", "1d6 + 3");
       appendBlock = appendBlock.replace("FILLER-TOHIT", "0");
       
       mobBlockArea.innerHTML += appendBlock;
       return;
   }
    
    appendBlock = appendBlock.replace(/FILLER-BLOCK/g, "Mob".concat(mobIncrement.toString()));
    blockArray.push("Mob".concat(mobIncrement.toString()));
    mobIncrement++;
    
    appendBlock = appendBlock.replace("FILLER-NAME", newMob.Name);
    appendBlock = appendBlock.replace(newMob.Icon, newMob.Icon.concat(" selected"));
    appendBlock = appendBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.NumDice.toString() + "d" + newMob.EquipWeapon.DamageDie.toString().concat(" + ").concat(newMob.EquipWeapon.BonusToDmg.toString()));
    appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);

    mobBlockArea.innerHTML += appendBlock;
    return; 
}


// Parse the weapon string, turn it into a weapon object we can send to the mob attack method
function parseWeapon(weapon, hitbonus) {
    // Create a weapon object out of the data. Sample data: 1d6 + 3 slashing
    var splitWeapon = weapon.trim().split("d");
    if (splitWeapon.length == 1) {
        // Something something error check
    }
    var numAttacks = parseInt(splitWeapon[0].trim());
    
    splitWeapon = splitWeapon[1].split("+");
    if (splitWeapon.length == 1) { // no result found for +, try -
        splitWeapon = splitWeapon[0].split("-");       
        if (splitWeapon.length == 1) {
            // Something something error check
        }
        var damageDie = parseInt(splitWeapon[0].trim()) * -1; // Flip that bit
    } else {    
        var damageDie = parseInt(splitWeapon[0].trim());
    }
    splitWeapon = splitWeapon[1].split(" ");
    var bonusDmg = parseInt(splitWeapon[0].trim());
    
    var damageType = splitWeapon[1].trim();
    
    return new Weapon("FILLER NAME", numAttacks, damageDie, damageType, hitbonus, bonusDmg);
    
    
}

function launchAttack() {
    var mobArray = [];
    var rollArray = [];
    var numCrits = 0;
    var numBlocks = blockArray.length;
    
    // Go though each creature block, spawn a number of mobs with those stats
    for(var i=0;i < numBlocks;i++) {
        //Name, Icon, to hit, weapon, number
        var name = document.getElementById(blockArray[i].concat("-Name")).value;
        var icon = document.getElementById(blockArray[i].concat("-Icon")).value;
        var tohit = document.getElementById(blockArray[i].concat("-ToHit")).value;
        var weapon = document.getElementById(blockArray[i].concat("-Weapon")).value;
        var number = document.getElementById(blockArray[i].concat("-Number")).value;
        
        weapon = parseWeapon(weapon);
        
        for(var j=0; j < number; j++) {
            mobArray.push(new Mob(name, icon, weapon))
        }                
    }
    
    // Having spawned our army, let them all launch attacks. Record the attack if it lands
    for (var i=0; i < mobArray.length;i++) {
        var attackRoll = mobArray[i].makeAttack();
        if (attackRoll == "crit") {
            rollArray.push(mobArray[i].dealCrit());
            numCrits = numCrits + 1;
        }
        else if (attackRoll >= targetAc) {
            rollArray.push(mobArray[i].dealDamage());
        }          
    }
    
    // Take a sum of the attacks that landed. Boom, dead enemy, maybe.
    var totalDamage = 0;
    var infoAppend = rollArray.length.toString.concat(" attacks landed\n");  
    for (var i=0; i < rollArray.length; i++) {
        totalDamage += rollArray[i];          
        infoAppend += rollArray[i].attacker.Icon + " ⚔" + rollArray[i].damageRoll.toString() + " [" + rollArray[i].hitRoll.toString() + "] "
        if (rollArray[i].crit) {
         infoAppend += "🌟CRIT!";
        }
        infoAppend += "\n";
    }
    
    infoArea.innerHTML = totalDamage.toString().concat(" total damage delt");
    infoArea.innerHTML += infoAppend;
    
    
}
