import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
     habits{
        _id
        createdAt
      }
    }
  }
`;
export const GET_USER_HABITS = gql`
  query GetUserHabits($username: String!) {
    user(username: $username) {
      _id
      username
      habits {
        _id
        habitText
        habitDate
        targetGoal
        targetGoalUnit
        actualPerformance
        actualPerformanceUnit
        progress
      }
    }
  }
`;

// export const QUERY_THOUGHTS = gql`
//   query getThoughts {
//     thoughts {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//     }
//   }
// `;

// export const QUERY_SINGLE_THOUGHT = gql`
//   query getSingleThought($thoughtId: ID!) {
//     thought(thoughtId: $thoughtId) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      habits {
        _id
        habitText
        habitUsername
        habitDate
        targetGoal
        targetGoalUnit
        actualPerformance
        actualPerformanceUnit
        progress
      }
    }
  }
`;
