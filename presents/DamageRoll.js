export default class DamageRoll {
    constructor(){
        this.crit = false;
        this.hitRoll = 0;
        this.damageRoll = 0;
        this.damageDie = 0;
        this.attacker = null;
        this.damageType = "";
        this.damageResults = [];
        this.missed = false;
    }
}
