import Res from "../Res";

export default class AllowOverrides {
	public name: any;

    constructor (context?, name?){
      this.name = name;
    }

    combine(responses) {
        //let response = new Res(this.name, `resulted from allow-overrides algorithm of ${this.name}`);
        let response = new Res(this.name);
        for (let i in responses){
            let res = responses[i];
            response.addObligations(res.obligations);
        }
        let decisions = responses.map(res=>{return res.effect});
        let idxPer = decisions.indexOf("permit");
        if (idxPer !== -1) {
            response.setEffect("permit");
        } else if (decisions.indexOf("deny") !== -1) {
            response.setEffect("deny");
        } else {
            //response.setInfo("not applicable to the targeted message");
        }
        return response;
    }

}
