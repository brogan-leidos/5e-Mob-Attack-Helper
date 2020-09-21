export function mobBlock() {
  return `<div id="FILLER-BLOCK" >
<table class="mobBlock">
  <tbody>
    <tr>
      <td><button class="mobCloseButton" id="FILLER-BLOCK-Delete" title="Delete mob">
        &times;
      </button></td>
      <td style="">Name:</td>
      <td style=""><input id="FILLER-BLOCK-Name" type="text" value="FILLER-NAME" /></td>
    </tr>
    <tr>
      <td style="text-align: center">
        <button id="FILLER-BLOCK-Enabled" title="Enable/Disable mob" class="fa fa-eye" /></td>
      <td>Icon:</td>
      <td><select id="FILLER-BLOCK-Icon" name="Icons">
        <option value="smile">😀</option>
        <option value="beard">🧔</option>
        <option value="zombie">🧟</option>
        <option value="skull">💀</option>
        <option value="shade">👤</option>
        <option value="dragon">🐉</option>
        <option value="dino">🦕</option>
        <option value="devil">😈</option>
        <option value="ogre">👹</option>
        <option value="unicorn">🦄</option>
        <option value="wolf">🐺</option>
        <option value="cat">🐱</option>
        <option value="bird">🦅</option>
        <option value="elk">🦌</option>
        <option value="dolphin">🐬</option>
        <option value="plant">🌲</option>
        <option value="robot">🤖</option>
      </select></td>
    </tr>
    <tr>
      <td>
      <select id="FILLER-BLOCK-Weapon-Select" class="weaponSelect" title="Common weapons for this mob type">
          <option value="ToHit:0 Weapon: Weapon2:">Custom</option>
          ADDITIONAL-WEAPONS
        </select>
      </td>
      <td>Bonus to Hit:</td>
      <td><input id="FILLER-BLOCK-ToHit" type="number" value="FILLER-TOHIT" /></td>
    </tr>
    <tr>
      <td>
        &nbsp;
      </td>
      <td>Weapon:</button></td>
      <td><input id="FILLER-BLOCK-Weapon" type="text" value="FILLER-WEAPON" title="Format must follow XdX +/- X" /></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><button class="weaponExpandButton fa fa-plus-square-o" id="FILLER-BLOCK-Weapon-Expand"></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Number:</td>
      <td><input id="FILLER-BLOCK-Number" type="number" value="1" /></td>
    </tr>
    <tr>
      <td><span class="fa fa-arrows-v"></span></td>
      <td><input id="FILLER-BLOCK-Adv" name="advantage" type="checkbox" /> <label for="advantage"> Advantage</label></td>
      <td><input id="FILLER-BLOCK-Dis" name="disadvantage" type="checkbox" /> <label for="disadvantage"> Disadvantage</label></td>
    </tr>
  </tbody>
</table>
</div>`
}

