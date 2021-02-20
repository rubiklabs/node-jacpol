const Rule = require("./Rule");
const Condition = require("./Condition");
const BlockOverrides = require('./algorithm/BlockOverrides');
const AllowOverrides = require('./algorithm/AllowOverrides');
const FirstApplicable = require('./algorithm/FirstApplicable');

class Policy {
	public id: any;
	public priority: any;
	public target: any;
	public obligations: any;
	public rules: any;
	public ruleCombiningAlgorithm: any;

    constructor(options, policyObj) {

      if (!("id" in policyObj)) throw new Error("id is not defined.");
      if (!("priority" in policyObj)) throw new Error("priority is not defined.");
      if (!("target" in policyObj)) throw new Error("target is not defined.");
      if (!("rules" in policyObj)) throw new Error("rules is not defined.");
      if (!("ruleCombiningAlgorithm" in policyObj)) throw new Error("ruleCombiningAlgorithm is not defined.");
      if (!("obligations" in policyObj)) throw new Error("obligations is not defined.");

      this.id = policyObj.id;
      this.priority = policyObj.priority;
      this.target = new Condition(options, policyObj.target, 'Target');
      this.obligations = policyObj.obligations;
      this.rules = this._setRules(options,policyObj.rules);
      this.ruleCombiningAlgorithm = this._setRuleCombiningAlgorithm(policyObj.ruleCombiningAlgorithm);
    }

    isApplicable(context){
      return this.target.isApplicable(context);
    }

    evaluateRules(context){
      let results = [];
      for (let i in this.rules) {
        if (!this.rules.hasOwnProperty(i)) continue;
        if (!this.rules[i].isApplicable(context)) continue;
        results.push(this.rules[i].evaluateCondition(context));
      }
      let response = this.ruleCombiningAlgorithm.combine(results);
      let obligations = this.obligations[response.effect];
      if (obligations) response.addObligations(obligations);
      return response;
    }

    _setRules(options,rules) {
      let nrules = [];
      for (let i in rules) {
        if (!rules.hasOwnProperty(i)) continue;
        let rule = rules[i];
        if (rule.priority === undefined) {
            rule.priority = this._getLastPriority() + 1;
        }
        if (!(rule instanceof Rule)) {
          rule = new Rule(options,rule);
        }
        nrules.push(rule);
      }
      return nrules;
    }

    _setRuleCombiningAlgorithm(combiningAlgorithm) {
        if (!combiningAlgorithm) {
            return 'blockOverrides';
        }
        switch (combiningAlgorithm) {
            case 'blockOverrides':
                return new BlockOverrides();
                break;
            case 'allowOverrides':
                return new AllowOverrides();
                break;
            case 'firstApplicable':
                return new FirstApplicable();
                break;
            default:
                throw Error('Unknown algorithm: ' + combiningAlgorithm);
        }
    }

    _getLastPriority() {
        let priorities = [];

        if (this.rules.length !== 0) {
            for (let i in this.rules) {
                if (!this.rules.hasOwnProperty(i)) continue;
                priorities.push(this.rules[i].priority);
            }
            return Math.max.apply(Math, priorities);
        } else {
            return -1;
        }
    }

}

module.exports = Policy;
