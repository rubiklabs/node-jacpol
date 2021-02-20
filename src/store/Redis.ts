const IStore = require("./IStore");
class RedisStore extends IStore{
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

module.exports = RedisStore;
