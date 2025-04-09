import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: AddUserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const ADD_HABIT = gql`
  mutation AddHabit($input: AddHabitInput!) {
    addHabit(input: $input) {
      _id
      habitText
      habitUsername
      targetGoal
      targetGoalUnit
      habitDate
    }
  }
`;
export const EDIT_HABIT = gql`
mutation EditHabit($habitId: ID!, $input: AddHabitInput!) {
  editHabit(habitId: $habitId, input: $input) {
    actualPerformance
    actualPerformanceUnit
    targetGoalUnit
    targetGoal
    habitText
    _id
  }
}
`;
// JBNOTE: Delete Mutation
export const REMOVE_HABIT = gql`
  mutation RemoveHabit($habitId: ID!) {
    removeHabit(habitId: $habitId) {
      _id
      habitText
    }
  }
`;

// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
