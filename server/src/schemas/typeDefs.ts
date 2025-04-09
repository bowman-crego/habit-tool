const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    habits: [Habit]
  }

  type Habit {
    _id: ID!
    habitText: String!
    habitUsername: String!
    habitDate: String!
    targetGoal: Int!
    targetGoalUnit: String!
    actualPerformance: Int
    actualPerformanceUnit: String
    progress: Int
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
  login(username: String!, password: String!): AuthPayload
  addHabit(input: AddHabitInput!): Habit
  removeHabit(habitId: ID!): Habit
  editHabit(habitId: ID!, input: AddHabitInput!): Habit
}


  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input AddHabitInput {
    habitText: String!
    habitUsername: String!
    targetGoal: Int!
    targetGoalUnit: String!
    habitDate: String!
     actualPerformance: Int      
    actualPerformanceUnit: String
  }
    input UpdateHabitInput {
  habitText: String
  habitUsername: String
  habitDate: String
  targetGoal: Int
  targetGoalUnit: String
  actualPerformance: Int
  actualPerformanceUnit: String
  progress: Int
}
  

  type AuthPayload {
    token: String!
    user: User!
  }
`;

export default typeDefs;