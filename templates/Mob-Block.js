export function mobBlock() {
  return `<div id="FILLER-BLOCK" name="mobBlock">
<table style="border: thin solid #000000; width: 234px;">
  <tbody>
    <tr>
      <td style="width: 63px;">Name:</td>
      <td style="width: 155px;"><input id="FILLER-BLOCK-Name" type="text" value="FILLER-NAME" /></td>
    </tr>
    <tr>
      <td style="width: 63px;">Icon:</td>
      <td style="width: 155px;">
      <select id="FILLER-BLOCK-Icon" name="Icons">
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
      </select>
      </td>
    </tr>
    <tr>
      <td style="width: 63px;">Bonus to Hit:</td>
      <td style="width: 155px;">
        <input id="FILLER-BLOCK-ToHit" type="number" value="FILLER-TOHIT"/>
      </td>
    </tr>
    <tr>
      <td style="width: 63px;">Weapon:</td>
      <td style="width: 155px;">
        <input id="FILLER-BLOCK-Weapon" type="text" value="FILLER-WEAPON"/>        
      </td>
    </tr>    
    <tr>
      <td>Number:</td>
      <td><input id="FILLER-BLOCK-Number" type="number" value=1 /></td>
    </tr>
  </tbody>
</table>
<div/>`
}

