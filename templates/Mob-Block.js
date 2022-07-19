// <!-- <span class="mobCloneButton" id="FILLER-BLOCK-Clone" title="Clone Mob"/><i class="fa fa-clone"></i></span> -->

export function mobBlock() {
  return `<div id="FILLER-BLOCK" class="overheadMobBlock">
<div class="mobBlockMenu">
  <span class="mobCloseButton" id="FILLER-BLOCK-Delete" title="Delete mob">&times</span>
  <span class="mobMinimizeButton" id="FILLER-BLOCK-Minimize" title="Minimize Mob"/><i class="fa fa-window-minimize"></i></span>  
  <span class="mobCloneButton" id="FILLER-BLOCK-Clone" title="Clone Mob"/><i class="fa fa-clone"></i></span>
  <span class="mobEnableButton" id="FILLER-BLOCK-Enable" title="Enable/Disable Mob"/><i class="fa fa-ban"></i></span>
</div>
<table class="mobBlock">
  <tbody>
    <tr>
      <td><span class="disableLabel" id="FILLER-BLOCK-Disable-Label"></span></td>
      <td>Name:</td>
      <td><input id="FILLER-BLOCK-Name" type="text" value="FILLER-NAME" /></td>
    </tr>
    <tr>
      <td>
        <button class="mobEnableButton" id="FILLER-BLOCK-Show" title="Show creature statblock"/><i class="fa fa-eye" style="display:block"></i></button>
      </td>
      <td>Icon:</td>
      <td><select id="FILLER-BLOCK-Icon" name="Icons" title="An icon used to identify this mob at a glance">
        <option value="smile">😀</option>
        <option value="beard">🧔</option>
        <option value="wizard">🧙‍</option>
        <option value="robot">🤖</option> 
        <option value="zombie">🧟</option>
        <option value="skull">💀</option>
        <option value="shade">👤</option>
        <option value="dragon">🐉</option>
        <option value="dino">🦕</option>
        <option value="rex">🦖</option>
        <option value="fairy">🧚‍♀️</option> 
        <option value="unicorn">🦄</option>
        <option value="devil">😈</option>
        <option value="ogre">👹</option>spider
        <option value="goblin">👺</option>
        <option value="alien">👽</option>
        <option value="alienmonster">👾</option>        
        <option value="fire">🔥</option>
        <option value="wolf">🐺</option>
        <option value="cat">🐱</option>
        <option value="bird">🦅</option>
        <option value="owl">🦉</option>
        <option value="elk">🦌</option>
        <option value="bear">🐻</option>
        <option value="boar">🐗</option>
        <option value="spider">🕷</option>
        <option value="cow">🐄</option>
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
      <td><i class="fa fa-caret-right" style="margin-left: -2px;"></i>Weapon:</td>
      <td><input id="FILLER-BLOCK-Weapon" type="text" value="FILLER-WEAPON" title="Recommended format is XdX +/- X" /></td>
    </tr>
    ${weaponMenu()}
    <tr>
      <td><button class="mobMoveButton" id="FILLER-BLOCK-Move-Up" title="Move Up"><i class="fa fa-angle-double-up" style="display:block"></i></button></td>
      <td>Number:</td>
      <td><input id="FILLER-BLOCK-Number" type="number" value="1" title="The number of creatures in this mob" /></td>
    </tr>
    <tr>
      <td><button class="mobMoveButton" id="FILLER-BLOCK-Move-Down" title="Move Down"><i class="fa fa-angle-double-down" style="display:block"></i></button></td>
      <td><input id="FILLER-BLOCK-Adv" type="checkbox" style="width: auto" /> <label for="FILLER-BLOCK-Adv"> Advantage</label></td>
      <td><input id="FILLER-BLOCK-Dis" type="checkbox" style="width: auto" /> <label for="FILLER-BLOCK-Dis"> Disadvantage</label></td>
    </tr>
  </tbody>
</table>
</div>`
}

export function weaponMenu(mobTag="FILLER-BLOCK", weaponNum="") {
  if (weaponNum != "") {
    weaponNum = `-${weaponNum}`;
  }
  return `<tr>
  <td></td>
  <td id="${mobTag}-Range${weaponNum}" class="rangeToggleButton" title="Melee assumes the attack is within 5ft">        
      <span id="${mobTag}-Melee${weaponNum}" style="color:black">Melee</span>
        / 
      <span id="${mobTag}-Ranged${weaponNum}">Ranged</span>       
  </td>
  <td style="display:flex">
    <span class="weaponExpandButton" id="${mobTag}-Weapon-Expand${weaponNum}">
      <i class="fa fa-plus-square-o" title="Add additional effects to this weapon"></i>
      <span id="${mobTag}-Weapon-Expand-Tip${weaponNum}" class="menuTip">Additional Effects</span>
    </span>
    <span class="extraAttackButton" id="${mobTag}-ExtraAttack${weaponNum}">
      <i class="fa fa-plus-circle" title="Give the creature another attack"></i>
      <span id="${mobTag}-ExtraAttack-Tip${weaponNum}" class="menuTip">Extra Attack</span>
    </span>
  </td>
</tr>`
}
