export function getCreatureStatBlock(creatureJson) {
    var name = creatureJson['name'];
    var type = creatureJson['type'];
    if (type['type']) {
        type = type['type'];
    }
    var alignment = '';
    var actions = '';
    for (let action of creatureJson['action']) {
        actions += `<b>${action['name']}</b>: ${action['entries'].join('\n')}\n`;
    }
    actions = actions.replace(/@[^\s]+/g, '').replace(/[{}]/g, '');

    var traits = '';
    for (let trait of creatureJson['trait']) {
        traits += `<div><b>${trait['name']}</b>: ${trait['entries'].join('\n')}</div>`;
    }
    traits = traits.replace(/@[^\s]+/g, '').replace(/[{}]/g, '');

    var skills = '';
    var skillKeys = Object.keys(creatureJson['skill']);
    for (let skill of skillKeys) {
        skills += `<div><b>${skill}</b>: ${creatureJson['skill'][skill]}</div>`;
    }
    skills = skills.replace(/@[^\s]+/g, '').replace(/[{}]/g, '');


    return `
<div class="creature-stat-block">
    <div class="creature-name">${creatureJson['name']}</div>
    <div class="creature-type">${creatureJson['type']}, ${alignment}</div>
    <div class="armor-class">Armor Class ${creatureJson['ac'][0] ? creatureJson['ac'][0] : creatureJson['ac']}</div>
    <div class="hit-points">Hit Points ${creatureJson['hp']['average']} ${creatureJson['hp']['formula']}</div>
    <div class="speed">${creatureJson['speed']}</div>
    <div class="stat-spread">
        <table>
            <tr>
                <td>STR</td>
                <td>DEX</td>
                <td>CON</td>
                <td>INT</td>
                <td>WIS</td>
                <td>CHR</td>
            </tr>
            <tr>
                <td>${creatureJson['str']}</td>
                <td>${creatureJson['dex']}</td>
                <td>${creatureJson['con']}</td>
                <td>${creatureJson['int']}</td>
                <td>${creatureJson['wis']}</td>
                <td>${creatureJson['cha']}</td>
            </tr>
        </table>
    </div>
    <div class="skills">Skills ${skills}</div>
    <div class="senses">Senses ${creatureJson['senses']}</div>
    <div class="languages">Languages ${creatureJson['languages']}</div>
    <div class="challenge-rating">Challenge ${creatureJson['cr']}</div>
    <div class="traits">${traits}</div>
    <div class="actions">
        <div class="section-title">Actions</div>
        ${actions}
    </div>
</div>
`;
}