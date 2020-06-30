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
        infoArea.innerHTML = "Hello world!"
        var appendBlock = mobBlock();
        appendBlock.replace("FILLER"
        mobBlockArea.innerHTML.replace("FILLER", "Mob".concat(mobIncrement.toString()));
        mobIncrement++;
    });
    
     skeletonButton.addEventListener('click', () => {
        infoArea.innerHTML = "Hello world!"
        mobBlockArea.innerHTML += mobBlock()
        mobBlockArea.innerHTML.replace("FILLER", "Mob" + mobIncrement);
        mobIncrement++;
    });

    zombieButton.addEventListener('click', () => {
        infoArea.innerHTML = "Hello world!"
        mobBlockArea.innerHTML += mobBlock()
        mobBlockArea.innerHTML.replace("FILLER", "Mob" + mobIncrement);
        mobIncrement++;
    });
    
    ghoulButton.addEventListener('click', () => {
        infoArea.innerHTML = "Hello world!"
        mobBlockArea.innerHTML += mobBlock()
        mobBlockArea.innerHTML.replace("FILLER", "Mob" + mobIncrement);
        mobIncrement++;
    });    
    
    
};
