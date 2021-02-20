
import Res from "../Res";

export default class FirstApplicable {
	public name: any;

    constructor (name?,x?){
      this.name = name;
    }

    combine(responses) {
        //const response = new Response(this.name, `${this.name} not applicable to the targeted message`);
        let response;
        for (let i in responses) {
          if (responses[i].effect !== 'notApplicable') {
            response = responses[i];
          }
        }
        return response;
    }

}
