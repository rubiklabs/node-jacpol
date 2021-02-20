const PolicySet = require('../PolicySet');

class Store{
	public policySetsJSON: any;
	public loadPolicies: any;
	public policySets: any;

  getPolicySet(context, message){
      throw new Error("method must be implemented");
  }

  getSource(){
    throw new Error("method must be implemented");
  }

  setSource(source){
    throw new Error("method must be implemented");
  }

  init(options){
    this.policySetsJSON = this.loadPolicies();
    this.policySets = this.buildPolicies(options,this.policySetsJSON);
  }

  getPolicySet(context) {

    for (let index in this.policySets) {

      if (!this.policySets.hasOwnProperty(index)) continue;

      let policySet = this.policySets[index];
      if (policySet.isApplicable(context)) {
        return policySet;
      }
    }
    return null;
  }

  buildPolicies(options,policySets){
    return policySets.map( policySet => {
      return new PolicySet(options,policySet)
    });
  }
}
module.exports = Store;
