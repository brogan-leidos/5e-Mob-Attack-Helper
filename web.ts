export default () => {
    const numSkeletons = <HTMLInputElement>document.getElementById('numSkeletons');
    const numZombies = <HTMLInputElement>document.getElementById('numZombies');
    const numGhouls = <HTMLInputElement>document.getElementById('numGhouls');


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
    goButton.click();

    saveButton.addEventListener('click', () => {
        const imageURL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const a = document.createElement('a');
        a.href = imageURL;
        a.download = `${contentInput.value}.png`;
        a.target = 'blank';
        a.click();
    });
};
