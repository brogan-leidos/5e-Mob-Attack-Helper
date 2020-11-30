export function discoveryTemplate(title, dc, roll, source, option1="op1", option2="op2") {  
  
 return `
  <table class="discoveryBlock dcBlock">
    <tbody>
      <tr>
        <td colspan=2 style="border-bottom: thin solid black">
          ${title}
          <span>
            <i id="acInfoButton" class="fa fa-question-circle" style="cursor:pointer; vertical-align:middle; position:absolute; margin-left:38px; margin-top:1px;"></i>
          </span>
        </td>
      </tr>
      <tr>
        <td colspan=2 style="border-bottom: thin solid black">${dc}</td>
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
      <tr>
        <td colspan=2 style="border-top: thin solid black">${source}</td>
      </tr>
    </tbody>
  </table>
  `
}


export function dcTemplate(title, dc, roll, source, option1="op1", option2="op2", bias=0) {  
  
  var opt1Bias = "";
  var opt2Bias = "";
  if (bias == 1) {
    opt2Bias = "-bias";
  }
  else if (bias == 2) {
    opt1Bias = "-bias";
  }
  
 return `
  <table class="discoveryBlock dcBlock">
    <tbody>
      <tr>
        <td colspan=2 style="border-bottom: thin solid black">
          ${title}
          <span>
            <i id="dcInfoButton" class="fa fa-question-circle" style="cursor:pointer; vertical-align:middle; position:absolute; margin-left:41px; margin-top:1px;"></i>
          </span>
        </td>
      </tr>
      <tr>
        <td colspan=2 style="border-bottom: thin solid black">${dc}</td>
      </tr>
      <tr>
        <td colspan=2>
           ${roll}
        </td>
      </tr>
      <tr>
        <td>
          <button class="hitButton${opt1Bias}" id="hitButton-${option1}">${option1}</button>
        </td>
        <td>
          <button class="missButton${opt2Bias}" id="missButton-${option2}">${option2}</button>
        </td>
      </tr>
      <tr>
        <td colspan=2 style="border-top: thin solid black">${source}</td>
      </tr>
    </tbody>
  </table>
  `
}
