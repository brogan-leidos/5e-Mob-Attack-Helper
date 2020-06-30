export default () => {
    numSkeletons = document.getElementById('numSkeletons');
    numZombies = document.getElementById('numZombies');
    numGhouls = document.getElementById('numGhouls');
    targetAc = document.getElementById('targetAc');
    infoArea = document.getElementById('infoArea');

    goButton = document.getElementById('goButton');

    goButton.addEventListener('click', () => {
        infoArea.innerHTML = "Hello world!"
    });
    
};
