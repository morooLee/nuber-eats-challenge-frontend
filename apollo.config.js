module.exports = {
  client: {
    tagName: 'gql',
    includes: ['./src/**/*.tsx'],
    service: {
      name: 'nuber-eats-challenge-backend',
      url: 'https://nuber-eats-challenge-backend.herokuapp.com/graphql',
    },
  },
};
