const jacpol = require('../src/index');

test('middleware generic test', () => {

  const validate = jacpol({
    contextKey:'bla',
    authorizationKey:'auth',
    isAuthorizedKey:'isAuthorized',
    store:__dirname + '/policies/policy.json',
    operators:{
    },
    comparators:{
    }
  });

  const req = {
    bla:{
      role:'Admin'
    }
  };
  const next = (err)=>{
    console.log(err);
  };

  validate(req,null,next);

  expect(req.auth).toEqual({
    effect:"permit",
    auth:true,
    result:true,
    obligations:new Map
  });
});
