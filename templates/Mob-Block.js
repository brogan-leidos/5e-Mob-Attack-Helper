//  <span class="mobCloneButton" id="FILLER-BLOCK-Clone" title="Clone Mob"/><i class="fa fa-clone"></i></span>

export function mobBlock() {
  return `<div id="FILLER-BLOCK" >
<div class="mobBlockMenu">
  <span class="mobCloseButton" id="FILLER-BLOCK-Delete" title="Delete mob">&times</span>
  <span class="mobMinimizeButton" id="FILLER-BLOCK-Minimize" title="Minimize Mob"/><i class="fa fa-window-minimize"></i></span>
  <span class="mobEnableButton" id="FILLER-BLOCK-Enabled" title="Enable/Disable mob"/><i class="fa fa-eye"></i></span>
  <span class="mobMoveUpButton" id="FILLER-BLOCK-Move-Up" class="fa fa-angle-double-up mobMoveButton" title="Move Up"></span>
  <span class="mobMoveDownButton" id="FILLER-BLOCK-Move-Down" class="fa fa-angle-double-down mobMoveButton" title="Move Down"></span>
</div>
<table class="mobBlock">
  <tbody>
    <tr>
      <td><span class="disableLabel" id="FILLER-BLOCK-Disable-Label"></span></td>
      <td style="">Name:</td>
      <td style=""><input id="FILLER-BLOCK-Name" type="text" value="FILLER-NAME" /></td>
    </tr>
    <tr>
      <td>

      </td>
      <td>Icon:</td>
      <td><select id="FILLER-BLOCK-Icon" name="Icons">
        <option value="smile">😀</option>
        <option value="beard">🧔</option>
        <option value="wizard">🧙‍</option>
        <option value="robot">🤖</option> 
        <option value="zombie">🧟</option>
        <option value="skull">💀</option>
        <option value="shade">👤</option>
        <option value="dragon">🐉</option>
        <option value="dino">🦕</option>
        <option value="unicorn">🦄</option>
        <option value="devil">😈</option>
        <option value="ogre">👹</option>
        <option value="alien">👽</option>
        <option value="alienmonster">👾</option>        
        <option value="wolf">🐺</option>
        <option value="cat">🐱</option>
        <option value="bird">🦅</option>
        <option value="elk">🦌</option>
        <option value="boar">🐗</option>
        <option value="frog">🐸</option>
        <option value="snake">🐍</option>
        <option value="dolphin">🐬</option>
        <option value="plant">🌲</option>      
      </select></td>
    </tr>
    <tr id="FILLER-BLOCK-Maximize" title="Maximize" style="display:none">
      <td></td>
      <td colspan="2">
        <button style="background-color: rgba(100, 100, 100, .4);font-size: 9px;display: block;text-align: center;height: 7px;"></button>
      </td>
    </tr>
    <tr>
      <td>        
      </td>
      <td>Bonus to Hit:</td>
      <td><input id="FILLER-BLOCK-ToHit" type="number" value="FILLER-TOHIT" /></td>
    </tr>
    <tr>
      <td>
        <select id="FILLER-BLOCK-Weapon-Select" class="weaponSelect" title="Common weapons for this mob type">
          <option value="[['ToHit', 1],['IsMelee', true],['Weapon', '1d1 + 1 slashing']]">Custom</option>
          ADDITIONAL-WEAPONS
        </select>
      </td>
      <td>Weapon:</td>
      <td><input id="FILLER-BLOCK-Weapon" type="text" value="FILLER-WEAPON" title="Recommended format is XdX +/- X" /></td>
    </tr>
    <tr>
      <td></td>
      <td id="FILLER-BLOCK-Range" class="rangeToggleButton" title="Melee assumes the attack is within 5ft">        
          <span id="FILLER-BLOCK-Melee" style="color:black">Melee</span>
            / 
          <span id="FILLER-BLOCK-Ranged">Ranged</span>       
      </td>
      <td style="display:flex">
        <span class="weaponExpandButton" id="FILLER-BLOCK-Weapon-Expand">
          <i class="fa fa-plus-square-o"></i>
          <span id="FILLER-BLOCK-Weapon-Expand-Tip" style="font-size: 10px; margin-left: 1px; color: black; vertical-align:top; display:inline-block; padding-top: 1px">Additional Effects</span>
        </span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>Number:</td>
      <td><input id="FILLER-BLOCK-Number" type="number" value="1" /></td>
    </tr>
    <tr>
      <td></td>
      <td><input id="FILLER-BLOCK-Adv" name="advantage" type="checkbox" style="width: auto" /> <label for="advantage"> Advantage</label></td>
      <td><input id="FILLER-BLOCK-Dis" name="disadvantage" type="checkbox" style="width: auto" /> <label for="disadvantage"> Disadvantage</label></td>
    </tr>
  </tbody>
</table>
</div>`
}

