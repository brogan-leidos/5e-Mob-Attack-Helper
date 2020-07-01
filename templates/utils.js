export function updateHtmlValues(blockArray) {
  
  var numBlocks = blockArray.length;
    
    // Go though each creature block, spawn a number of mobs with those stats
    for(var i=0;i < numBlocks;i++) {
        var enabled = document.getElemenyById(blockArray[i].concat("-Enabled")).value;
        var name = document.getElementById(blockArray[i].concat("-Name")).value;
        var icon = document.getElementById(blockArray[i].concat("-Icon")).value;
        var tohit = document.getElementById(blockArray[i].concat("-ToHit")).value;
        var weapon = document.getElementById(blockArray[i].concat("-Weapon")).value;
        var number = document.getElementById(blockArray[i].concat("-Number")).value;        
        var advantage = document.getElementById(blockArray[i].concat("-Adv")).checked;
        var disadvantage = document.getElementById(blockArray[i].concat("-Dis")).checked;
      
      //Update them values
      
    }
}
