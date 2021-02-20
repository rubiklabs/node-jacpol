import PEP from './Pep';
import FileStore from './store/FileStore';

import * as defaultOperators from './operators';
import * as defaultComparators from './comparators';


export default class Engine{
	public options: any;
	public pep: any;
	public store: any;
	public comparators: any;
	public operators: any;

  setOptions(options){

    const { store, comparators, operators} = options;

    if(typeof(store) === 'string'){
      options.store = new FileStore(store);
    }

    options.operators = {...operators, ...defaultOperators };
    options.comparators = {...comparators, ...defaultComparators };

    this.options = options;
    this.pep = new PEP(options);
  }

  validate(context){
    return this.pep.analyse(context);
  }
}
