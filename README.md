# Mobby - A DnD 5e Mob Attack Helper Tool
If you're like me and find the DMG rules for mob combat underwhelming - this is the tool for you!
This tools intention is to allow all aspiring druids, necromancers, and warlords to fulfill their wildest mass combat dreams; without the hassle of hearing your friends groan as you request to shoot a goblin with 40 skeletons at once.

== ToDo:
Ideas in no particular order:
  - A Custom Counter kind of effect for weapons (To track strength drain or other misc effects)
  - A toggle for the dynamic launch attack button text
  - Make it clear when the first attack crits or misses
  - Color schemes so people can use multiple tabs
  - A way to stagger the flow of an assault, but this will likely come in much later when we do grouping
  - Resistances...? Fuck. Think of a way to not have a huge freaking sheet of checkboxes or have fickle user input be what determines their resistances..
  
  + Update the damage total output AS the run is ongoing. Something to look into!

Actual Priorities:
  Priority #1: Port this to an Angular project so we can use mat libraries and chunk the code so its not aweful to work with
    - Drag and drop mob block that can be grouped up 
  1. Convenience DC checks for non stacking conditions. If all we do is knock prone, its not like they can get even more prone 🤷‍♀️
  2. A pathfinder text change for some conditions? Not really sure how it works, sorry its low priority earlier edition folks 🙏
  3. Some kind of option to have or not have stacking of certain conditions (stacking grappling is pretty good for example)
  Far Future: Save a JSON of current configuration

== Known issues:
  - Deleting a mob while a hit prompt is up and there are multiple attacks from that mob will cause things to break
  - Damage tooltips are a little wonkey when the number is large. Look into CSS positioning fixes!
  - ~It's a bit ugly, and I'm a bit terrible at CSS~ It's looking a bit better and I'm a little better at CSS!
  - This implementation of the weapon parser uses eval(). It works for most everything, but maybe theres a problem here I'm missing?




Link to the application page:
https://brogan-leidos.github.io/5e-Mob-Attack-Helper/

Link to the live website:
https://www.mobby5e.io


Note: If you're brave enough to venture into the source code, you have my condolences. This was my first ever shot at a JS project, and I can now say with certainty that it is a bit of a MESS. You have been warned - god speed brave adventurer (-_-)7
