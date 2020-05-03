class AttributeCondition {

    constructor(options,condition) {
        this.attribute = Object.keys(condition)[0];
        this.expression = condition[this.attribute];
        this.operators = options.operators;
    }

    isApplicable(context, expression = this.expression) {
        /**
         * Verifies if the condition is applicable to the message.
         * First, the system value that corresponds to the attribute is retrieved;
         * then, that value is compared with the parameter specified in the condition
         * by executing the operator implementation.
         * @param  {Object}    message
         */
        let value = context[this.attribute];

        let final = false;
        if (expression.constructor === Object) {
          let results = [];
          for (let operator in expression) {

            let result = false;

            if (!(expression.hasOwnProperty(operator))) continue;

            const operation = this.operators[operator];
            let params = expression[operator];

            if (operator==="not" || operator==="allOf" || operator === "anyOf"){

              params = Array.isArray(params)?params:[params];

              const operatorInput = params.map(param =>{
                return this.isApplicable(context, param);
              });

              result = operation(operatorInput);
            } else if (operator !== "in" && params.constructor === Array) {

              result = params.some(param => {
                return operation(value, param, this.attribute);
              });
            } else {
              result = operation(value, params, this.attribute);
            }
            results.push(result);
          }
          final = this.operators.allOf(results);
      } else if (expression.constructor === Array) {

          final = expression.some(express=>{
              return this.isApplicable(context, express);
          });
      } else {

          throw new Error(`Unsupported condition format`);
      }
      return final;
    }
}

module.exports = AttributeCondition;
