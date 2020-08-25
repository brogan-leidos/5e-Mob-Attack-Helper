export function discoveryTemplate(roll) {  
  
  return `
<table class="discoveryBlock">
  <tbody>
    <tr>
       ${roll}
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
`
}
