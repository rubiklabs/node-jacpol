/**
 * Created by Hao Jiang on 22/02/17.
 * Policy Decision Point - Point which evaluates access requests against authorization policies before issuing access decisions.
 * The PDP evaluates the authorization request against the policies it is configured with. The policies are acquired via
 * the Policy Retrieval Point (PRP) and managed by the Policy Administration Point (PAP). If needed it also retrieves attribute values from underlying Policy Information Points (PIP).
 * The PDP reaches a decision (Permit / Deny / NotApplicable / Indeterminate) and returns it to the PEP
 */

'use strict';

const PRP = require("./Prp");
const Response = require("./Response");

class PDP {
	public prp: any;
	public name: any;

  constructor(options) {
    this.prp = new PRP(options);
  }

  authorize(context) {

      const policySet = this.prp.getPolicySet(context);
      let response;

      if(policySet){
        response = policySet.evaluatePolicies(context);
      }else{
        response = new Response(this.name, 'No policies could be found from PRP')
      }
      return response;
  }
}

module.exports = PDP;
