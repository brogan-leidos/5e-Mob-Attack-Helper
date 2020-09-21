export function addWeaponMobTemplate(title, roll) {  
  
  /// Add Modifier V
 return `
 <ul class="main-nav">
  <li>Extra Damage Roll
  </li>
  <li>Attack Range
    <ul>
      <li>Melee within 5ft</li>
      <li>Melee outside 5ft</li>
      <li>Ranged</li>
    </ul>
  </li>
  <li>Saving Throw
    <ul>
      <li>Extra Damage
        <ul>
          <li>Half damage on a success</li>
          <li>No damage on a success</li>
        </ul>
      </li>      
      <li>Extra Damage With Condition
        <ul>
          <li>Knocks Prone
            <ul>
              <li>Half damage on a success</li>
              <li>No damage on a success</li>
            </ul>
          </li>
          <li>Paralyzes
            <ul>
              <li>Half damage on a success</li>
              <li>No damage on a success</li>
            </ul>
          </li>
          <li>Restrains
            <ul>
              <li>Half damage on a success</li>
              <li>No damage on a success</li>
            </ul>
          </li>          
        </ul>
      </li>
      <li>Condition
        <ul>
          <li>Knocks Prone</li>
          <li>Paralyzes</li>
          <li>Restrains</li>
        </ul>
      </li>
    </ul>
  </li>
  
  <li>Front End Design
    <ul>
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a>
        <ul>
          <li><a href="#">Resets</a></li>
          <li><a href="#">Grids</a></li>
          <li><a href="#">Frameworks</a></li>
        </ul>
      </li>
      <li><a href="#">JavaScript</a>
        <ul>
          <li><a href="#">Ajax</a></li>
          <li><a href="#">jQuery</a></li>
        </ul>
      </li>
    </ul>
  </li>
  `
}
