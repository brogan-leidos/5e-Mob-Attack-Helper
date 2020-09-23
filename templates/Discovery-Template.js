export function discoveryTemplate(title, roll, option1="op1", option2="op2") {  
  
 return `
  <table class="discoveryBlock">
    <tbody>
      <tr>
        <td colspan=2 style="border-bottom: thin solid black">${title}</td>
      </tr>
      <tr>
        <td colspan=2>
           ${roll}
        </td>
      </tr>
      <tr>
        <td>
          <button class="hitButton" id="hitButton-${option1}">${option1}</button>
        </td>
        <td>
          <button class="missButton" id="missButton-${option2}">${option2}</button>
        </td>
      </tr>
    </tbody>
  </table>
  `
}
