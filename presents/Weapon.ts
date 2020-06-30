class Weapon {
    Name = ""
    DamageDie = ""
    DamageType = ""
    BonusToHit = 0
    BonusToDmg = 0
    
    def __init__ (self, name, die, dtype, hit, dmg):
        self.Name = name
        self.DamageDie = die
        self.DamageType = dtype
        self.BonusToHit = hit
        self.BonusToDmg = dmg
        
    def __str__ (self):
        return "{4}: +{0} to hit, ({1}) + {2} {3} damage".format(self.BonusToHit, self.DamageDie, self.BonusToDmg, self.DamageType, self.Name)
}
