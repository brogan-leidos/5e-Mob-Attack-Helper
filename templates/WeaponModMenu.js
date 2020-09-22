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
  
  /// Add Modifier V
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
  <tr>
 
  `
}

