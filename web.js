import * as Mob from './presents/Mob.js'
import {mobBlock} from './templates/Mob-Block.js'

export default () => {
    var casterProficiency = document.getElementById('casterProficiency');
    var targetAc = document.getElementById('targetAc');
        
    var mobBlockArea = document.getElementById('mobBlockArea');
    var infoArea = document.getElementById('infoArea'); // Debug info and roll info

    var goButton = document.getElementById('goButton');
    var skeletonButton = document.getElementById('addSkeleton');
    var zombieButton = document.getElementById('addZombie');
    var ghoulButton = document.getElementById('addGhoul');

    var mobArray = []


    var mobIncrement = 0;
    
    goButton.addEventListener('click', () => {
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
   else {
       appendBlock = appendBlock.replace("FILLER-NAME", "Mob".concat(mobIncrement.toString()));
       mobIncrement++;
       appendBlock = appendBlock.replace("FILLER-ICON", "smile");
       appendBlock = appendBlock.replace("FILLER-WEAPON", "");
       appendBlock = appendBlock.replace("FILLER-TOHIT", "0");
       
       mobBlockArea.innerHTML += appendBlock;
       return;
   }
    
    appendBlock = appendBlock.replace("FILLER-NAME", "Mob".concat(mobIncrement.toString()));
    mobIncrement++;
    appendBlock = appendBlock.replace("FILLER-ICON", newMob.Icon);
    appendBlock = appendBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.DamageDie + newMob.EquipWeapon.BonusToDmg);
    appendBlock = appendBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);

    mobBlockArea.innerHTML += appendBlock;
    return;
    
   
    
}
