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
   var mobBlock = mobBlock();

   if (presentName == "Skeleton") {
      newMob = new Skeleton(); 
   }
   else {
       mobBlock = mobBlock.replace("FILLER-NAME", "Mob".concat(mobIncrement.toString()));
       mobIncrement++;
       mobBlock = mobBlock.replace("FILLER-ICON", "smile");
       mobBlock = mobBlock.replace("FILLER-WEAPON", "");
       mobBlock = mobBlock.replace("FILLER-TOHIT", "0");
       
       mobBlockArea.innerHTML += mobBlock;
       return;
   }
    
    mobBlock = mobBlock.replace("FILLER-NAME", "Mob".concat(mobIncrement.toString()));
    mobIncrement++;
    mobBlock = mobBlock.replace("FILLER-ICON", newMob.Icon);
    mobBlock = mobBlock.replace("FILLER-WEAPON", newMob.EquipWeapon.DamageDie + newMob.EquipWeapon.BonusToDmg);
    mobBlock = mobBlock.replace("FILLER-TOHIT", newMob.EquipWeapon.BonusToHit);

    mobBlockArea.innerHTML += mobBlock;
    return;
    
   
    
}
