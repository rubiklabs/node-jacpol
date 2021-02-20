/**
 * Created by hjiang on 3/1/17.
 * Copyright 2016 PT Inovação e Sistemas SA
 * Copyright 2016 INESC-ID
 * Copyright 2016 QUOBIS NETWORKS SL
 * Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
 * Copyright 2016 ORANGE SA
 * Copyright 2016 Deutsche Telekom AG
 * Copyright 2016 Apizee
 * Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
 * Copyright 2016 Telecom Bretagne
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/**
 * @author Ana Caldeira <ana.caldeira@tecnico.ulisboa.pt>
 * @classdesc Class to combine the authorization decisions that result from rules evaluation.
 */
let Response = require("../Response");

class AllowOverrides {
	public name: any;

    constructor (context?, name?){
      this.name = name;
    }

    combine(responses) {
        let response = new Response(this.name, `resulted from allow-overrides algorithm of ${this.name}`);
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
            response.setInfo("not applicable to the targeted message");
        }
        return response;
    }

}

module.exports = AllowOverrides;
