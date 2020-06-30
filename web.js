import Mob from './presents/Mob.js'
import {mobBlock} from './templates/Mob-Block.js'
import Weapon from './presents/Weapon.js'
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
       appendBlock = appendBlock.replace("FILLER-BLOCK", "Mob".concat(mobIncrement.toString()));
       appendBlock = appendBlock.replace("FILLER-NAME", "Mob".concat(mobIncrement.toString()));
       blockArray.push("Mob".concat(mobIncrement.toString()));
       mobIncrement++;
       
       appendBlock = appendBlock.replace("FILLER-WEAPON", "1d6 + 3");
       appendBlock = appendBlock.replace("FILLER-TOHIT", "0");
       
       mobBlockArea.innerHTML += appendBlock;
       return;
   }
    
    appendBlock = appendBlock.replace("FILLER-BLOCK", "Mob".concat(mobIncrement.toString()));
    blockArray.push("Mob".concat(mobIncrement.toString()));
    mobIncrement++;
    
    appendBlock = appendBlock.replace("FILLER-NAME", newMob.Name);
    appendBlock = appendBlock.replace(newMob.Icon, newMob.Icon.concat(" selected"));
    appendBlock = appendBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.DamageDie.concat(" + ").concat(newMob.EquipWeapon.BonusToDmg.toString()));
    appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);

    mobBlockArea.innerHTML += appendBlock;
    return; 
}



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
    }
    
    var damageDie = parseInt(splitWeapon[0].trim());
    splitWeapon = splitWeapon[1].split(" ");
    var bonusDmg = parseInt(splitWeapon[0].trim());
    
    var damageType = splitWeapon[1].trim();
    
    return new Weapon("FILLER NAME", damageDie, numAttacks, damageType, hitbonus, bonusDmg);
    
    
}

function launchAttack() {
    mobArray = [];
    var numBlocks = blockArray.length;
    
    // Go though each creature block, spawn a number of mobs with those stats
    for(var i=0;i < numBlocks;i++) {
        //Name, Icon, to hit, weapon, number
        var name = document.getElementById(blockArray[i].concat("-Name"));
        var icon = document.getElementById(blockArray[i].concat("-Icon"));
        var tohit = document.getElementById(blockArray[i].concat("-ToHit"));
        var weapon = document.getElementById(blockArray[i].concat("-Weapon"));
        var number = document.getElementById(blockArray[i].concat("-Number"));
        
        weapon = parseWeapon(weapon);
        
        for(var j=0; j < number; j++) {
            mobArray.push(new Mob(name, icon, tohit, weapon, number))
        }
        
        
    }
}
