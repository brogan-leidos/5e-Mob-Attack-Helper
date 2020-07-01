export function updateHtmlValues(blockArray) {
  
  var numBlocks = blockArray.length;
    
    // Go though each creature block, spawn a number of mobs with those stats
    for(var i=0;i < numBlocks;i++) {
        var enabled = document.getElementById(blockArray[i].concat("-Enabled"));
        var name = document.getElementById(blockArray[i].concat("-Name"));
        var icon = document.getElementById(blockArray[i].concat("-Icon"));
        var tohit = document.getElementById(blockArray[i].concat("-ToHit"));
        var weapon = document.getElementById(blockArray[i].concat("-Weapon"));
        var number = document.getElementById(blockArray[i].concat("-Number"));        
        var advantage = document.getElementById(blockArray[i].concat("-Adv"));
        var disadvantage = document.getElementById(blockArray[i].concat("-Dis"));
      
        //Update them values

        enabled.setAttribute("value", enabled.value);
        name.setAttribute("value", name.value);
        icon.options.setAttribute("selectedIndex", icon.selectedIndex);
        tohit.setAttribute("value", tohit.value);
        weapon.setAttribute("value", weapon.value);
        number.setAttribute("value", number.value);
        advantage.setAttribute("checked", advantage.checked);
        disadvantage.setAttribute("checked", disadvantage.checked);
      
    }
}
