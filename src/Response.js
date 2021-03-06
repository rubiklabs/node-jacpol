class Response {

    constructor (effect = 'notApplicable'){
        this.effect = effect;
        this.obligations = new Map();
    }

    addObligations(obligations) {
      if (Object.keys(obligations).length){
        for (let key in obligations) {
          if (!obligations.hasOwnProperty(key)) continue;
          this.obligations.set(key, obligations[key]);
        }
      }
    }

    setEffect(effect){
        this.effect = effect;
    }

    clearObligations() {
        this.obligations.clear();
    }
}

module.exports = Response;
