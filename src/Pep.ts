/*
* Policy Enforcement Point - Point which intercepts user's access request to a resource, makes a decision request to the
* PDP to obtain the access decision (i.e. access to the resource is approved or rejected), and acts on the received decision.
* When a user tries to access a file or other resource on a computer network or server that uses policy-based access management,
* the PEP will describe the user’s attributes to other entities on the system. Therefore, PEPs are usually specific to an application
* and cannot be re-used for different applications.
*
* A user makes an access request to a resource. The request is received by a policy enforcement point. The policy enforcement point
* might check the user’s credentials to see if the user has been authenticated.
* */

const PDP = require("./Pdp");

class PEP {
	public pdp: any;

    constructor(options) {
      this.pdp = new PDP(options);
    }

    analyse(context) {

        let response = this.pdp.authorize(context);
        let authorizationResponse = this._parseToAuthzResponse(context,response);
        return this._enforce(authorizationResponse);
    }

    _parseToAuthzResponse(context,response) {

        if (response.effect === "permit"){
            response.auth = true;
            response.result = true;
        } else if (response.effect === "notApplicable") {
            response.result = context.defaultBehaviour;
            response.auth = false;
        } else if (response.effect === "deny"){
            response.auth = false;
            response.result = false;
        }
        return response;
    }

    _enforce(response) {

      // Todo: take actions according to/specified in the decision from PDP
      if (Object.keys(response.obligations).length){
        for (let key in response.obligations) {
          if (!response.obligations.hasOwnProperty(key)) continue;
        }
      }
      return response;
    }
}

module.exports = PEP;
