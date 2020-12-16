
export function modifierRow(underDc) {    
  if (!underDc) {
      return `
      <tr>
        <td></td>
        <td>
          <select class="weaponModSelect" id="FILLER-BLOCK-Mod-Select">
            <option>Extra Damage</option>
            <option>Condition</option>
            <option>DC</option>
          </select>
        </td>
        <td><div id="FILLER-BLOCK-Mod"></div></td>  
      </tr> 
      `;
 }
 else {
   return `
  <tr>
    <td></td>
    <td>
      <select class="weaponModSelect" id="FILLER-BLOCK-Mod-Select" style="width: 85px; margin-left: 8px">
        <option>Damage (1/2 on save)</option>
        <option>Damage (none on save)</option>
        <option>Condition</option>
      </select>
    </td>
    <td><div id="FILLER-BLOCK-Mod"></div></td>  
  </tr> 
  `;
 }
}

export function chooseModifierType(type, mobTag, modRow) {
    if (type == "DC") {
      return `<input id="${mobTag}-${modRow}-Mod" type="number" value="10" style="width:78px" />
              <select id="${mobTag}-${modRow}-Mod-Dc">
                <option>Str</option>
                <option>Dex</option>
                <option>Con</option>
                <option>Int</option>
                <option>Wis</option>
                <option>Chr</option>
              </select>`; 
    }
    else if (type == "Condition") {
      return `
      <select id="${mobTag}-${modRow}-Mod">
        <optgroup label="Common">
          <option>Knock Prone</option>
          <option>Paralyze</option>        
          <option>Restrain</option>
        </optgroup>
        <optgroup label="Other">
          <option>Blinded</option>
          <option>Charmed</option>
          <option>Deafened</option>
          <option>Frightened</option>
          <option>Grappled</option>
          <option>Poisoned</option>
        </optgroup>
      </select><i class="fa fa-list stacktag" title="Prone, Restrain, and Paralyze do not typically stack. Multiple checks will not be made for them." id="${mobTag}-${modRow}-StackTag"></i>`;
    }
    else if (type.includes("Damage")) {
      return `<input id="${mobTag}-${modRow}-Mod" value="1d6 + 2 slashing" />`; 
    }
}

