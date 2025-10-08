import { killPort } from '@nx/node/utils';
/* eslint-disable */

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `global` is shared between setup and teardown.
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await killPort(port);
  console.log(global.__TEARDOWN_MESSAGE__);
};
