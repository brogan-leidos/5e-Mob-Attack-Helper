export function mobBlock() {
  return `<div id="FILLER-BLOCK" >
<table style="border: thin solid #000000; width: 290px;">
  <tbody>
    <tr>
      <td style="width:10px;"><button id="FILLER-BLOCK-Delete" style="color:red;" title="Delete mob">
        &times;
      </button></td>
      <td style="width: 120px;">Name:</td>
      <td style="width: 150px;"><input id="FILLER-BLOCK-Name" type="text" value="FILLER-NAME" /></td>
    </tr>
    <tr>
      <td><input id="FILLER-BLOCK-Enabled" name="" type="checkbox" title="Enable/Disable mob" checked="true" /></td>
      <td>Icon:</td>
      <td><select id="FILLER-BLOCK-Icon" name="Icons">
        <option value="smile">😀</option>
        <option value="zombie">🧟</option>
        <option value="skull">💀</option>
        <option value="shade">👤</option>
        <option value="dragon">🐉</option>
        <option value="dino">🦕</option>
        <option value="devil">😈</option>
        <option value="dolphin">🦄</option>
        <option value="wolf">🐺</option>
        <option value="cat">🐱</option>
        <option value="bird">🦅</option>
        <option value="dolphin">🐬</option>
        <option value="plant">🌲</option>
      </select></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Bonus to Hit:</td>
      <td><input id="FILLER-BLOCK-ToHit" type="number" value="FILLER-TOHIT" /></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Weapon:</td>
      <td><input id="FILLER-BLOCK-Weapon" type="text" value="FILLER-WEAPON" title="Format must follow XdX +/- X" /></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Number:</td>
      <td><input id="FILLER-BLOCK-Number" type="number" value="1" /></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input id="FILLER-BLOCK-Adv" name="advantage" type="checkbox" /> <label for="advantage"> Advantage</label></td>
      <td><input id="FILLER-BLOCK-Dis" name="disadvantage" type="checkbox" /> <label for="disadvantage"> Disadvantage</label></td>
    </tr>
  </tbody>
</table>
</div>`
}

