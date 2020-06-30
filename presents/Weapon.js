export default class Weapon {
    
    constructor (name="", die="", dtype="", hit=0, dmg=0){
        this.Name = name
        this.DamageDie = die
        this.DamageType = dtype
        this.BonusToHit = hit
        this.BonusToDmg = dmg
    }
        
//     def __str__ (self):
//         return "{4}: +{0} to hit, ({1}) + {2} {3} damage".format(self.BonusToHit, self.DamageDie, self.BonusToDmg, self.DamageType, self.Name)
}
