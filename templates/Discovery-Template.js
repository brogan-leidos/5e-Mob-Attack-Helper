export function discoveryTemplate(roll) {  
  
  return `<div id="FILLER-BLOCK" >
<table class="discoveryBlock">
  <tbody>
    <tr>
      Roll: ${roll}
    </tr>
    <tr>
    <td>
      <button id="hitButton">Hit!</button>
    </td>
    <td>
      <button id="missButton">Missed</button>
    </td>
    </tr>
  </tbody>
</table>
</div>`
}