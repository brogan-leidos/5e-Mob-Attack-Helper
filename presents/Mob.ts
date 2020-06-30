class Mob {
    public AC = 0;
    public Health = 0;
    Str: number;
    Dex: number;
    Con: number;
    Int: number;
    Wis: number;
    Chr: number;
    public Weapons = new Array<any>();
    public EquipWeapon = null;
    public Icon = "⚫";
    
    // Make an attack roll, modify by equip weapon
    function makeAttack(): any {
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
    }
    
    // Make a strike using equip weapon
    function dealDamage(self): any {
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
    }
        
    // Crit using equip weapon!
    function dealCrit(self): any {
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
    }
}
