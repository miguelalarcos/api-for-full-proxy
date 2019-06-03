const { MongoClient, ObjectID } = require('mongodb');
const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const url = 'mongodb://db:27017/test';
const dbName = process.env.DB_NAME; //'test';

let db = null;
const client = new MongoClient(url);

describe('test demo', () => {
  // eslint-disable-next-line no-underscore-dangle
  let _id = null;

  beforeAll(async () => {
    await client.connect();
    db = client.db(dbName);
  });

  afterAll(() => {
    client.close();
  });

  beforeEach(async () => {
    _id = new ObjectID();
    await db.collection('test').insertOne({
      _id, owner: 'miguel', color: 'red', num: 5,
    });
  });

  afterEach(async () => {
    await db.collection('test').deleteMany({ });
  });

  test('test simple', async () => {
    expect.assertions(1);
    const response = await axios.get('http://api:3000/api/test') //,
      // { headers: { authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoibWlndWVsIiwicm9sZXMiOlsiYWRtaW4iXX0.ErNc40MdgPp5R9KT55CJ_KAXABrXXrdZuv7BSV-McaQ' } });
    expect(response.data).toEqual(
      {text: 'Hello World!!!'}
      // { _id: `${_id}`, owner: 'miguel', color: 'red', num: 5 }
    );
  });
});
