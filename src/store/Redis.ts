import Store from "./Store";

export default class RedisStore extends Store{
	public context: any;
	public logger: any;
	public name: any;

    constructor (context){
        super();
        this.context = context;
        this.logger = this.context.registry.getLogger();
        this.name = "PRP RedisStore";
    }

    getPolicySet(message){
        //todo get policy from redis
    }
}
