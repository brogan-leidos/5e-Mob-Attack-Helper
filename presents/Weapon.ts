class Weapon {
    Name: string = ""
    DamageDie: string = ""
    DamageType: string = ""
    BonusToHit: string = 0
    BonusToDmg: string = 0
    
    constructor (name: string, die: string, dtype: string, hit: number, dmg: number){
        this.Name = name
        this.DamageDie = die
        this.DamageType = dtype
        this.BonusToHit = hit
        this.BonusToDmg = dmg
    }
        
//     def __str__ (self):
//         return "{4}: +{0} to hit, ({1}) + {2} {3} damage".format(self.BonusToHit, self.DamageDie, self.BonusToDmg, self.DamageType, self.Name)
}
