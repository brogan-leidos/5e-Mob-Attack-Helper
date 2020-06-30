class Mob:
    const AC = 0
    const Health = 0
    const Str, Dex, Con, Int, Wis, Chr = 0, 0, 0, 0, 0, 0
    const Weapons = new Array<any>
    const EquipWeapon = null
    const Icon = "⚫"
    
    def __init__ (self):
        raise NotImplementedError()
        
    def getDamageMod(self):
        raise NotImplementedError()
    
    # Make an attack roll, modify by equip weapon
    def makeAttack(self):
        self.rollClass.attacker = self

        attackRoll = random.randint(1,20)
        if attackRoll == 1:
            self.rollClass.hitRoll = 1
            return 1
        if attackRoll == 20:
            self.rollClass.hitRoll = "crit"
            return "crit"
        
        self.rollClass.hitRoll = attackRoll + self.EquipWeapon.BonusToHit
        return self.rollClass.hitRoll
    
    # Make a strike using equip weapon
    def dealDamage(self):
        splitString = self.EquipWeapon.DamageDie.split("d")
        numAttacks = int(splitString[0])
        maxDamage = int(splitString[1])
        
        damageTotal = 0
        for i in range(0, numAttacks):
            damageTotal = damageTotal + random.randint(1, maxDamage)
        damageTotal = damageTotal + self.EquipWeapon.BonusToDmg
        self.rollClass.damageRoll = damageTotal
        self.rollClass.damageDie = self.EquipWeapon.DamageDie
        return self.rollClass
        
    # Crit using equip weapon!
    def dealCrit(self):
        splitString = self.EquipWeapon.DamageDie.split("d")
        numAttacks = int(splitString[0])
        maxDamage = int(splitString[1])
        
        damageTotal = 0
        for i in range(0, numAttacks*2):
            damageTotal = damageTotal + random.randint(1, maxDamage)
        damageTotal = damageTotal + self.EquipWeapon.BonusToDmg
        
        self.rollClass.damageRoll = damageTotal
        self.rollClass.damageDie = self.EquipWeapon.DamageDie
        self.rollClass.crit = True
        return self.rollClass
