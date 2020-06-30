import * as _ from './presents/Mob.js'
import Templates from './templates/Mob-Block.js'

export default () => {
    var numSkeletons = document.getElementById('numSkeletons');
    var numZombies = document.getElementById('numZombies');
    var numGhouls = document.getElementById('numGhouls');
    var targetAc = document.getElementById('targetAc');
    
    
    var mobBlockArea = document.getElementById('mobBlockArea');
    var infoArea = document.getElementById('infoArea'); // Debug info and roll info

    var goButton = document.getElementById('goButton');

    goButton.addEventListener('click', () => {
        infoArea.innerHTML = "Hello world!"
        mobBlockArea.innerHTML = "hello world"
    });
    
};
