class Weapon {
    var Name = ""
    var DamageDie = ""
    var DamageType = ""
    var BonusToHit = 0
    var BonusToDmg = 0
    
    constructor (name, die, dtype, hit, dmg){
        this.Name = name
        this.DamageDie = die
        this.DamageType = dtype
        this.BonusToHit = hit
        this.BonusToDmg = dmg
    }
        
//     def __str__ (self):
//         return "{4}: +{0} to hit, ({1}) + {2} {3} damage".format(self.BonusToHit, self.DamageDie, self.BonusToDmg, self.DamageType, self.Name)
}
