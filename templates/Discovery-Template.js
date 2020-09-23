export function discoveryTemplate(title, roll, option1="Hit!", option2="Missed") {  
  
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
          <button id="hitButton-${option1}">${option1}</button>
        </td>
        <td>
          <button id="missButton-${option2}">${option2}</button>
        </td>
      </tr>
    </tbody>
  </table>
  `
}
