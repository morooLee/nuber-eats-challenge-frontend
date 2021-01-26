module.exports = {
  client: {
    tagName: 'gql',
    includes: ['./src/**/*.tsx'],
    service: {
      name: 'nuber-eats-challenge-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
