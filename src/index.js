const Engine = require('./Engine');

const engine =  new Engine();

module.exports = (options) => {

  let { contextKey,authorizationKey,isAuthorizedKey } = options;

  if(!contextKey){
    contextKey = 'jacpol';
  }

  if(!authorizationKey){
    authorizationKey = 'authorization';
  }

  if(!isAuthorizedKey){
    isAuthorizedKey = 'isAuthorized';
  }

  engine.setOptions(options);

  return (req,res,next) => {
    try{
      const context = req[contextKey];
      const response = engine.validate(context);
      req[authorizationKey] = response;
      req[isAuthorizedKey] = response.auth;
      next();
    }catch(err){
      next(err);
    }
  }
};
