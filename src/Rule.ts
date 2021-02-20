let Condition = require("./Condition");
class Rule {
	public id: any;
	public target: any;
	public condition: any;
	public obligations: any;
	public effect: any;
	public priority: any;

    constructor(options,rule) {
      if (!("id" in rule)) throw new Error("id is not defined.");
      if (!("target" in rule)) throw new Error("target is not defined.");
      if (!("condition" in rule)) throw new Error("condition is not defined.");
      if (!("obligations" in rule)) throw new Error("obligations is not defined.");
      if (!("effect" in rule)) throw new Error("effect is not defined.");
      if (!("priority" in rule)) throw new Error("priority is not defined.");
      this.id = rule.id;
      this.target = new Condition(options,rule.target, 'Target');
      this.condition = new Condition(options,rule.condition);
      this.obligations = rule.obligations;
      this.effect = rule.effect;
      this.priority = rule.priority;
    }

    isApplicable(context){
        return this.target.isApplicable(context);
    }

    evaluateCondition(context) {
        let res = new Res();
        let isApplicable = this.condition.isApplicable(context);
        if (isApplicable) {
            res.setEffect(this.effect);
            res.addObligations(this.obligations);
            return res;
        }
        return res;
    }

}

module.exports = Rule;
