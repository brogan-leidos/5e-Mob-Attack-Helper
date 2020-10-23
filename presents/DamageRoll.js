export default class DamageRoll {
    constructor(){
        this.crit = false;
        this.autoCrit = false;
        this.missed = false;
        
        this.hitRoll = 0;
        this.attackRoll1 = 0;
        this.attackRoll2 = 0;
        this.vantage = 0; // 1: Adv, -1: DisAdv
        
        this.attacker = null; // Points back to the spawned mob that made the attack
        this.damageResults = []; // Expects: [[damage, type]], used to calculate total damage
        this.rollBreakdown = []; // Expects: [1,2,...,n], used to show tooltips
        
        this.error = false;
        this.message = "";        
    }
}
