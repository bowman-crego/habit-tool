import { Habit, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  username: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface HabitArgs {
  habitId: string;
}

interface AddHabitArgs {
  input:{
    actualPerformance: number;
    habitText: string;
    habitUsername: string;
    targetGoal: number;
    targetGoalUnit: string;
    habitDate: string;

  }
}
interface EditHabitArgs {
  habitId: string;
  input:{
    habitText: string;
    habitUsername: string;
    habitDate: string;
    targetGoal: number;
    targetGoalUnit: string;
    actualPerformance: number;
    actualPerformanceUnit: string;
    progress: number;
    
  }
}

//JB NOTE: Don't think we need those.
// interface AddCommentArgs {
//   thoughtId: string;
//   commentText: string;
// }

// interface RemoveCommentArgs {
//   thoughtId: string;
//   commentId: string;
// }

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('habits');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('habits');
    },
    habits: async () => {
      return await Habit.find().sort({ createdAt: -1 });
    },
    habit: async (_parent: any, { habitId }: HabitArgs) => {
      return await Habit.findOne({ _id: habitId });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their habits
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('habits');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { username, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ username });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    addHabit: async (_parent: any, { input }: AddHabitArgs, context: any) => {
      if (context.user) {
        const habit = await Habit.create({
          ...input,
          actualPerformance: input.actualPerformance ?? 0,
          actualPerformanceUnit: input.actualPerformance ?? "",
          progress: 0, // or compute it here if you want
        });
    
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { habits: habit._id } }
        );
    
        return habit;
      }
      throw AuthenticationError;
    },
    
    // addComment: async (_parent: any, { thoughtId, commentText }: AddCommentArgs, context: any) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw AuthenticationError;
    // },
    removeHabit: async (_parent: any, { habitId }: HabitArgs, context: any) => {
      console.log("Context User:", context.user);
      console.log("Habit ID:", habitId);    
      if (context.user) {
        const habit = await Habit.findOneAndDelete({
          _id: habitId,
          habitUsername: context.user.username,
        });

        if(!habit){
          throw AuthenticationError;
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { habits: habit._id } }
        );

        return habit;
      }
      //throw AuthenticationError;
      console.log("User not authenticated.");
      throw new AuthenticationError("You need to be logged in!");
    },

    editHabit: async (_parent: any, { habitId, input }: EditHabitArgs, context: any) => {
      if (context.user) {
        console.log("Editing habit with ID:", habitId);
        console.log("Input data:", input);
        const updatedHabit = await Habit.findOneAndUpdate(
          { _id: habitId},
          { ...input },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log("Updated habit:", updatedHabit);
        if (!updatedHabit) {
          throw new AuthenticationError('Could not authenticate user.');
        }
        return updatedHabit;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // updateHabit: async (_parent: any, { habitId, input }: any, context: any) => {
    //   if (!context.user) {
    //     throw new AuthenticationError("You need to be logged in!");
    //   }
    
    //   const {
    //     habitText,
    //     targetGoal,
    //     targetGoalUnit,
    //     actualPerformance,
    //     actualPerformanceUnit, // required now
    //     habitDate,
    //   } = input;
    
    //   const existingHabit = await Habit.findById(habitId);
    //   if (!existingHabit) {
    //     throw new Error("Habit not found");
    //   }
    
    //   const updatedTarget = targetGoal ?? existingHabit.targetGoal;
    //   const updatedActual = actualPerformance ?? existingHabit.actualPerformance ?? 0;
    
    //   const progress =
    //     updatedTarget && updatedTarget > 0
    //       ? Math.min(100, Math.round((updatedActual / updatedTarget) * 100))
    //       : 0;
    
    //       const updatedFields = {
    //         ...input,
    //         progress,
    //       };
          
    //       const updatedHabit = await Habit.findByIdAndUpdate(
    //         habitId,
    //         updatedFields,
    //         { new: true }
    //       );
    
    //   return updatedHabit;
    // }
    
    // removeComment: async (_parent: any, { thoughtId, commentId }: RemoveCommentArgs, context: any) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw AuthenticationError;
    },
  };

export default resolvers;
