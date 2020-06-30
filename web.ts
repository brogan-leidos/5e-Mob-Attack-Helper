export default () => {
    const numSkeletons = <HTMLInputElement>document.getElementById('numSkeletons');
    const numZombies = <HTMLInputElement>document.getElementById('numZombies');
    const numGhouls = <HTMLInputElement>document.getElementById('numGhouls');
    const targetAc = <HTMLInputElement>document.getElementById('targetAc');

    const goButton = <HTMLInputElement>document.getElementById('goButton');

    goButton.addEventListener('click', () => {
        const value = (contentInput.value || '').trim();
        if (!value) {
            return;
        }
        const fontSize = Math.min(Math.abs(+fontSizeInput.value || 60));
        const fontFamily = fontFamilyInput.value || 'sans-serif';
        const box = new BoxText(value, {
            fontSize,
            fontFamily
        });
        box.draw(canvas);
    });
    
};
