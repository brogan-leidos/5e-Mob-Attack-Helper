export function mobBlock() {
  return `<div id="FILLER">
<table style="border: thin solid #000000; width: 234px;">
  <tbody>
    <tr>
      <td style="width: 63px;">Name:</td>
      <td style="width: 155px;"><input id="mobName" type="text" /></td>
    </tr>
    <tr>
      <td style="width: 63px;">Icon:</td>
      <td style="width: 155px;"><select id="icons" name="Icons">
        <option value="smile">😀</option>
        <option value="skull">🧟&zwj;</option>
        <option value="zombie">💀</option>
        <option value="shade">👤</option>
      </select>
      </td>
    </tr>
    <tr>
      <td style="width: 63px;">Weapon:</td>
      <td style="width: 155px;"><input style="width: 30px;" type="text" />d<input style="width: 30px;" type="text" /></td>
    </tr>
    <tr>
      <td>Number:</td>
      <td><input type="number"</td>
    </tr>
  </tbody>
</table>
<div/>`
}

