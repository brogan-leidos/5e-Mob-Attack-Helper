import * from './present/Mob'

export default () => {
    var numSkeletons = document.getElementById('numSkeletons');
    var numZombies = document.getElementById('numZombies');
    var numGhouls = document.getElementById('numGhouls');
    var targetAc = document.getElementById('targetAc');
    var infoArea = document.getElementById('infoArea');

    var goButton = document.getElementById('goButton');

    goButton.addEventListener('click', () => {
        infoArea.innerHTML = "Hello world!"
    });
    
};
