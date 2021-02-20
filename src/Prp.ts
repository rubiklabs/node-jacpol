class PRP {
	public store: any;

    constructor(options) {
      this.store = options.store;
      this.store.init(options);

    }

    getPolicySrc(){
      return this.store
    }

    getPolicySet(context){
      return this.getPolicySrc().getPolicySet(context);
    }
}

module.exports = PRP;
