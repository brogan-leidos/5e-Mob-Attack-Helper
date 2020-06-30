import Mob from './presents/Mob.js'
import {mobBlock} from './templates/Mob-Block.js'
import Skeleton from './presents/Skeleton.js'
import Zombie from './presents/Zombie.js'


var mobIncrement = 0;

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

    var mobArray = []

    
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
    
    
};


function createPresent(presentName) {
   var newMob;
   var appendBlock = mobBlock();

   if (presentName == "Skeleton") {
      newMob = new Skeleton(); 
   }
   if (presentName == "Zombie") {
      newMob = new Zombie(); 
   }
   else {
       appendBlock = appendBlock.replace("FILLER-BLOCK", "Mob".concat(mobIncrement.toString()));
       appendBlock = appendBlock.replace("FILLER-NAME", "Mob".concat(mobIncrement.toString()));
       mobIncrement++;
       appendBlock = appendBlock.replace("FILLER-WEAPON", "1d6 + 3");
       appendBlock = appendBlock.replace("FILLER-TOHIT", "0");
       
       mobBlockArea.innerHTML += appendBlock;
       return;
   }
    
    appendBlock = appendBlock.replace("FILLER-BLOCK", "Mob".concat(mobIncrement.toString()));
    mobIncrement++;
    appendBlock = appendBlock.replace("FILLER-NAME", newMob.Name);
    appendBlock = appendBlock.replace(newMob.Icon, newMob.Icon.concat(" selected"));
    appendBlock = appendBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.DamageDie.concat(" + ").concat(newMob.EquipWeapon.BonusToDmg.toString()));
    appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);

    mobBlockArea.innerHTML += appendBlock;
    return;
    
   
    
}
