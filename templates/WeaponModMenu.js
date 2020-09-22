export function addWeaponMobTemplate(title, roll) {  
  
  /// Add Modifier V
 return `
 <ul class="main-nav">
  <li>Damage Roll</li>
  <li>DC</li>
  <li>Condition
    <ul>
      <li>Knock Prone</li>
      <li>Restrain</li>
      <li>Paralyze</li>
    </ul>
  </li>
  <li>Range
    <ul>
      <li>Within 5ft</li>
      <li>Outside of 5ft</li>
    </ul>
  </li>
 </ul>
 
  `
}

export function modifierRow() {    
 return `
  <tr>
    <td></td>
    <td>
      <select id="FILLER-BLOCK-Mod-Select">
        <option>Extra Damage</option>
        <option>Condition</option>
        <option>DC</option>
      </select>
    </td>
    <td><div id="FILLER-BLOCK-Mod"></div></td>  
  </tr> 
  `
}

export function modifierRowNoTr() {    
 return `
  
    <td></td>
    <td>
      <select id="FILLER-BLOCK-Mod-Select">
        <option>Extra Damage</option>
        <option>Condition</option>
        <option>DC</option>
      </select>
    </td>
    <td><div id="FILLER-BLOCK-Mod"></div></td>  
  
  `
}

export function modifierRowUnderDc() {    
 return `
  
    <td></td>
    <td>
      <select id="FILLER-BLOCK-Mod-Select">
        <option>Extra Damage (1/2 on save)</option>
        <option>Extra Damage (none on save)</option>
        <option>Condition</option>
      </select>
    </td>
    <td><div id="FILLER-BLOCK-Mod"></div></td>  
   
  `
}

export function chooseModifierType(type, mobTag, modRow) {
    if (type == "DC") {
      return `<input id="${mobTag}-${modRow}-Mod" type="number" value="10" style="width:78px" />
              <select id="${mobTag}-${modRow}-Mod-Dc">
                <option>Str</option>
                <option>Dex</option>
                <option>Other</option>
              </select>`; 
    }
    else if (type == "Condition") {
      return `
      <select id="${mobTag}-${modRow}-Mod">
        <option>Knock Prone</option>
        <option>Restrain</option>
        <option>Paralyze</option>
      </select>`;
    }
    else if (type == "Extra Damage") {
      return `<input id="${mobTag}-${modRow}-Mod" value="1d6 + 2 slashing" />`; 
    }
}

