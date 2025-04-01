const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }
        input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Auth {
    token: ID!
    user: User
  } 
    type Query {
        users: [User]
        }

  `

export default typeDefs;