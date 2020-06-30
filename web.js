import * as Mob from './presents/Mob.js'
import {mobBlock} from './templates/Mob-Block.js'

export default () => {
    var numSkeletons = document.getElementById('numSkeletons');
    var numZombies = document.getElementById('numZombies');
    var numGhouls = document.getElementById('numGhouls');
    var targetAc = document.getElementById('targetAc');
    
    var mobArray = []
    
    var mobBlockArea = document.getElementById('mobBlockArea');
    var infoArea = document.getElementById('infoArea'); // Debug info and roll info

    var goButton = document.getElementById('goButton');

    var mobIncrement = 0;
    
    goButton.addEventListener('click', () => {
        infoArea.innerHTML = "Hello world!"
        mobBlockArea.innerHTML += mobBlock()
        mobBlockArea.innerHTML.replace("FILLER", "Mob" + mobIncrement);
        mobIncrement++;
    });
    
};
