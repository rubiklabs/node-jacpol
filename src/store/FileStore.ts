const Store = require("./Store");
const fs = require('fs');
const path = require('path');
const PolicySet = require('../PolicySet');

class FileStore extends Store {
	public srcPath: any;
	public policySets: any;

    constructor(path){
      super();
      this.srcPath = path;
    }

    loadPolicies(){

      const policyFile = JSON.parse(
        fs.readFileSync(path.resolve(this.srcPath))
      );

      return policyFile;
    }

    getSource() {
        return this.srcPath;
    }

    setSource(srcPath) {
        this.srcPath = srcPath;
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

}

module.exports = FileStore;
