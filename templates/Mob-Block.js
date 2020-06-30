export function mobBlock() {
  return `<div id="FILLER-BLOCK">
<table style="border: thin solid #000000; width: 234px;">
  <tbody>
    <tr>
      <td style="width: 63px;">Name:</td>
      <td style="width: 155px;"><input id="mobName" type="text" value="FILLER-NAME" /></td>
    </tr>
    <tr>
      <td style="width: 63px;">Icon:</td>
      <td style="width: 155px;"><select id="icons" name="Icons" value="zombie>
        <option value="smile">😀</option>
        <option value="zombie">🧟</option>
        <option value="skull">💀</option>
        <option value="shade">👤</option>
        <option value="dragon">🐉</option>
        <option value="pumpkin">🎃</option>
      </select>
      </td>
    </tr>
    <tr>
      <td style="width: 63px;">Weapon:</td>
      <td style="width: 155px;">
        <input type="text" value="FILLER-WEAPON"/>        
      </td>
    </tr>
    <tr>
      <td style="width: 63px;">Bonus to Hit:</td>
      <td style="width: 155px;">
        <input type="number" value="FILLER-TOHIT"/>
      </td>
    </tr>
    <tr>
      <td>Number:</td>
      <td><input type="number" value=1 /></td>
    </tr>
  </tbody>
</table>
<div/>`
}

