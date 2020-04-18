const DEVELOPMENT = "development";
const PRODUCTION = "production";

const env = process.env.NODE_ENV || DEVELOPMENT;

const ports = {
  [DEVELOPMENT]: 8080,
  [PRODUCTION]: 80,
};

module.exports = {
  port: ports[env],
};
