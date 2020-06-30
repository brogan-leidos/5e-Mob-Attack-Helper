export default class Weapon {
    
    constructor (name="", numdice=0, ddie="", dtype="", hit=0, dmg=0){
        this.Name = name
        this.NumDice = numdice
        this.DamageDie = ddie        
        this.DamageType = dtype
        this.BonusToHit = hit
        this.BonusToDmg = dmg
    }
        
//     def __str__ (self):
//         return "{4}: +{0} to hit, ({1}) + {2} {3} damage".format(self.BonusToHit, self.DamageDie, self.BonusToDmg, self.DamageType, self.Name)
}
