const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    habits: [Habit]
  }

<<<<<<< Updated upstream
  type Habit {
    _id: ID!
    habitText: String!
    habitUsername: String!
    habitDate: String!
    targetGoal: Int!
    targetGoalUnit: String!
    actualPerformance: Int
    actualPerformanceUnit: String
  }

  type Query {
    users: [User]
    user(username: String!): User # Add this line to define the 'user' query
    habits: [Habit]
    habit(habitId: ID!): Habit
    me: User
  }

  type Mutation {
    addUser(input: AddUserInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addHabit(input: AddHabitInput!): Habit
    removeHabit(habitId: ID!): Habit
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input AddHabitInput {
    habitText: String!
    habitUsername: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
=======
    type Auth {
    token: ID!
    user: User
  } 
    type Query {
        users: [User]
        user(username: String!): User
        me: User
        }

    type Mutation {
    addUser(input: UserInput!): Auth
    login(username: String! email: String!, password: String!): Auth
  }

  `
>>>>>>> Stashed changes

export default typeDefs;