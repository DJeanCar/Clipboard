import { createClient } from  'redis';

const host = process.env.NODE_ENV === 'test' ? 'localhost' : 'redis_db';
const client = createClient({ url: `redis://${host}:6379` });

client.connect();

const closeInstance = () => {
  client.quit();
}

export {
  client,
  closeInstance,
};
