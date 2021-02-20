
import Res from "../Res";

export default class BlockOverrides {
	public name: any;

    constructor (context?,name?){
    }

    combine(responses) {
        //let response = new Res(this.name, `resulted from block-overrides algorithm of ${this.name}`);
        let response = new Res(this.name);
        for (let i in responses){
            let res = responses[i];
            response.addObligations(res.obligations);
        }
        let decisions = responses.map(res=>{return res.effect});
        let idxDeny = decisions.indexOf("deny");
        if (idxDeny !== -1) {
            response.setEffect("deny");
        } else if (decisions.indexOf("permit") !== -1) {
            response.setEffect("permit");
        } else {
            //response.setInfo("not applicable to the targeted message");
        }
        return response;
    }

}
