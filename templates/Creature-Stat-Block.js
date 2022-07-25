var pbByCrMap = {
'0':'+2',
'1/8':'+2',
'1/4':'+2',
'1/2':'+2',
'1':'+2',
'2':'+2',
'3':'+2',
'4':'+2',
'5':'+3',
'6':'+3',
'7':'+3',
'8':'+3',
'9':'+4',
'10':'+4',
'11':'+4',
'12':'+4',
'13':'+5',
'14':'+5',
'15':'+5',
'16':'+5',
'17':'+6',
'18':'+6',
'19':'+6',
'20':'+6',
'21':'+7',
'22':'+7',
'23':'+7',
'24':'+7',
'25':'+8',
'26':'+8',
'27':'+8',
'28':'+8',
'29':'+9',
'30':'+9',
}

export function titleCase(str) {
    str = str.toLowerCase();
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 

    }
    return str.join(' ');
}

export function drillDownValue(creatureJson, value) {
    var currentLevel = creatureJson[value];
    while(true) {
        var oldValue = currentLevel;
        if (typeof(oldValue) === 'string' || typeof(oldValue) === 'number') {
            return oldValue;
        }
        currentLevel = currentLevel[0] ?? currentLevel[value] ?? currentLevel;
        if (oldValue === currentLevel || !currentLevel) {
            break;
        }        
    }
    return oldValue;
}

function replaceTags(text) {
    return text.replace(/\{@h\}\d+/g, '').replace(/\{@atk \w+\}/g, '').replace(/\{@([^\s]+)\s([^}]+)\}/g, '<$1>$2</$1>').replace(/\w+\|\|(\w+)/g, '$1');
}

var numberToSpellLevelMap = {
    0: 'Cantrips (at will)',
    1: '1st level',
    2: '2nd level',
    3: '3rd level',
    4: '4th level',
    5: '5th level',
    6: '6th level',
    7: '7th level',
    8: '8th level',
    9: '9th level',
}


export function getCreatureStatBlock(creatureJson) {
    var type = creatureJson['type'];
    if (type['type']) {
        type = type['type'];
    }
    var actions = '';
    if (creatureJson['action']) {
        for (let action of creatureJson['action']) {
            actions += `<b>${action['name'].replace('{@recharge}', '')}</b>: ${action['entries'].join('\n')}\n`;
        }
        actions = replaceTags(actions);
    }

    var traits = '';
    if (creatureJson['trait']) {
        traits = `<div class="traits">`;
        for (let trait of creatureJson['trait']) {
            traits += `<div><b>${trait['name']}</b>: ${trait['entries'].join('\n  ')}</div>`;
        }
        traits = replaceTags(traits);
        traits += "</div>";
    }

    var skills = ''
    
    if (creatureJson['skill']) {
        var skillsList = [];    
        var skillKeys = Object.keys(creatureJson['skill']);
        for (let skill of skillKeys) {
            skillsList.push(`${skill} ${creatureJson['skill'][skill]}`);
        }
        skills = `<div class="skills"><b>Skills</b> ${skillsList.join(', ')}</div>`
    }

    var speedArray = [];
    var speedKeys = Object.keys(creatureJson['speed']);
    for (let speed of speedKeys) {
        speedArray.push(`${speed} ${creatureJson['speed'][speed]}`);
    }

    var spellcasting = "";
    if (creatureJson['spellcasting'].length > 0) {
        spellcasting += "<div>"
        for (let spellContainer of creatureJson['spellcasting']) {
            var spellName = spellContainer['name'];
            var entry = replaceTags(spellContainer['headerEntries'][0]);
            for (var i=0; i > spellContainer['spells'].length; i++) {
                var header = numberToSpellLevelMap[i];
                var spellList = [];
                var slots = i === 0 ? '' : ` (${spellContainer['spells'][i]['slots']})`;
                for (let spellname of spellContainer['spells'][i]['spells']) {
                    spellList.push(spellname);
                }                    
                spellcasting += `<div class="spell-level">${header}${slots}: ${spellList.join(', ')}</div>`;
            }
            spellcasting += `<div class="spell-entry"><b>${spellName}</b>: ${entry}</div>`;
        }
        spellcasting += "</div>"
    }
    

    return `
<div class="creature-stat-block">
    <div class="flex-row flex-align-space-between">
        <div class="creature-name">${creatureJson['name']}</div>
        <div><button id="statBlockCloseButton">&times;</button></div>
    </div>
    <div class="creature-type">${titleCase(drillDownValue(creatureJson, 'type'))}</div>
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
            <td>${creatureJson['hp']['average']} (${creatureJson['hp']['formula']})</td>
            <td>${speedArray.join(', ')} ft</td>
            <td>${creatureJson['cr']}</td>
            <td>${pbByCrMap[creatureJson['cr']]}</td>
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
    ${skills}
    <div class="senses"><b>Senses</b> ${creatureJson['senses']}</div>
    <div class="languages"><b>Languages</b> ${creatureJson['languages']}</div>
    <div class="divider"></div>
    ${traits}
    ${spellcasting}
    <div class="actions">
        <div class="section-title">Actions</div>
        <div>${actions}</div>
    </div>
</div>
`;
}