import AttributeCondition from "./AttributeCondition";

export default class Condition {
  
	public usedFor: any;
	public operators: any;
	public toString: any;
	public condition: any;
	public name: any;

    constructor(options, condition, usedFor = "Condition"){
      this.usedFor = usedFor;
      this.operators = options.operators;
      this.toString = JSON.stringify(condition);
      this.condition = this._buildCondition(options,condition);
    }

    _buildCondition(options,condition){

      if(condition.constructor === Object){

        if(Object.keys(condition).length > 1){
          let allOf = [];
          for(let key in condition){
            if(!condition.hasOwnProperty(key)) continue;
            let value = condition[key];
            allOf.push(this._buildCondition(options,{[key]: value}));
          }
          condition = {"allOf": allOf};
        }else if(Object.keys(condition).length === 1){

          let key = Object.keys(condition)[0];
          let value = condition[key];
          if(key in this.operators){
            value = Array.isArray(value)?value:[value];
            condition[key] = value.map(subCondition=>{
              return this._buildCondition(options,subCondition);
            });
          }else{
            condition = new AttributeCondition(options, condition);
          }
        }
      }else{

        condition = condition.map( subCondition => {
          return this._buildCondition(options,subCondition);
        });
        condition = condition.length===0?{}:{"anyOf": condition};
      }
      return condition;
    }

    isApplicable(context, condition = this.condition){

        if (condition instanceof AttributeCondition){

          return condition.isApplicable(context);

        } else if (condition.constructor !== Object) {

          throw new Error(`[${this.name}] syntax error: compiled condition should only be of Object type`);

        } else if (Object.keys(condition).length > 1){

          throw new Error(`[${this.name}] syntax error: compiled condition contains multiple keys in a map`);

        } else if (Object.keys(condition).length === 1) {

          let key = Object.keys(condition)[0];
          let value = condition[key];
          if (key in this.operators) {
            return this.operators[key](
              value.map(subCondition => {
                  return this.isApplicable(context, subCondition);
              })
            );
          } else if (key in context){
            throw new Error(`[${this.name}] syntax error: attribute is failed to build attribute condition object: ${key}`);
          } else {
            throw new Error(`[${this.name}] syntax error: unrecognized key in condition field: ${key}`);
          }
        } else {
          return true;
        }
    }
}
