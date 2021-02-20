import PDP from "./Pdp";

export default class PEP {
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
