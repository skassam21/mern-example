module.exports = {
  auth: {
    secret: 'websitesecretpleasekeepprivate'
  },
  database: {
    local: 'mongodb://localhost:27017/mydb',
    prod: process.env.MONGODB_URI
  }
};
