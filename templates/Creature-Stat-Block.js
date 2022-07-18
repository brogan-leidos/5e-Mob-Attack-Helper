export function drillDownValue(creatureJson, value) {
    var currentLevel = creatureJson[value];
    while(true) {
        var oldValue = currentLevel;
        currentLevel = (currentLevel[0] && typeof(currentLevel[0]) !== 'string') ?? currentLevel[value] ?? currentLevel;
        if (oldValue === currentLevel) {
            break;
        }        
    }
    return currentLevel;
}

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
        skills += `${skill} ${creatureJson['skill'][skill]}, `;
    }
    skills = skills.replace(/@[^\s]+/g, '').replace(/[{}]/g, '');


    return `
<div class="creature-stat-block">
    <div class="creature-name">${creatureJson['name']}</div>
    <div class="creature-type">${drillDownValue(creatureJson, 'type')}</div>
    <table class="creature-header-stats">
        <tr>
            <td>Armor Class</td>
            <td>Hit points</td>
            <td>Speed</td>
            <td>CR</td>
            <td>PB</td>
        </td>
        <tr>
            <td>${drillDownValue(creatureJson, 'ac')}</td>
            <td>${creatureJson['hp']['average']} ${creatureJson['hp']['formula']}</td>
            <td>${drillDownValue(creatureJson, 'speed')} ft</td>
            <td>${creatureJson['cr']}</td>
            <td>${creatureJson['pb']}</td>
        </tr>
    </table>
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
    <div class="skills"><b>Skills</b> ${skills}</div>
    <div class="senses"><b>Senses</b> ${creatureJson['senses']}</div>
    <div class="languages"><b>Languages</b> ${creatureJson['languages']}</div>
    <div class="traits">
        <div class="section-title">Traits</div>    
        ${traits}
    </div>
    <div class="actions">
        <div class="section-title">Actions</div>
        ${actions}
    </div>
</div>
`;
}