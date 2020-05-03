const Engine = require('../src/Engine');

test('engine generic test', async () => {

  const jacpol = new Engine();

  jacpol.setOptions({
    store:__dirname + '/policies/policy.json',
    operators:{
    },
    comparators:{
    }
  });

  const context = {
    role:'Admin'
  };

  const response = jacpol.validate(context);

  expect(response).toEqual({
    effect:"permit",
    auth:true,
    result:true,
    obligations:new Map
  });
});
