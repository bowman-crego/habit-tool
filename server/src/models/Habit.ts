// import { Schema, model, Document } from 'mongoose';

// // Define an interface for the Thought document
// // JBNOTE: Not sure we'll need this.
// // interface IComment extends Document {
// //   commentText: string;
// //   createdAt: Date;
// // }

// interface IHabit extends Document {
//   habitText: string;
//   habitUsername: string;
//   habitDate: Date;
//   targetGoal: number;
//   targetGoalUnit: string;
//   actualPerformance: number;
//   actualPerformanceUnit: string;
// }
// // JBNOTE: Commenting out. Not sure we'll need this.
// // Define the schema for the Comment subdocument
// // const commentSchema = new Schema<IComment>(
// //   {
// //     commentText: {
// //       type: String,
// //       required: true,
// //       minlength: 1,
// //       maxlength: 280,
// //     },
// //   },
// //   {
// //     _id: false,
// //     toJSON: { getters: true },
// //     toObject: { getters: true },
// //     timestamps: true,
// //   }
// // );

// // Define the schema for the Thought document
// const habitSchema = new Schema<IHabit>(
//   // JBNOTE: Commented this out for reference. We can probably delete once we validate everything is working.
//   // {
//   //   thoughtText: {
//   //     type: String,
//   //     required: true,
//   //     minlength: 1,
//   //     maxlength: 280,
//   //     trim: true,
//   //   },
//   //   thoughtAuthor: {
//   //     type: String,
//   //     required: true,
//   //     trim: true,
//   //   },
//   //   comments: [commentSchema],
//   // },
//   // {
//   //   timestamps: true,
//   //   toJSON: { getters: true },
//   //   toObject: { getters: true },
//   // }
//   {
//     habitText: {
//       type: String,
//       required: true,
//       minlength: 1,
//       maxlength: 100,
//       trim: true,
//     },
//     habitUsername: {
//       type: String,
//       required: true,
//       minlength: 1,
//       maxlength: 100, //This can be whatever we choose. 100 is probably excessive.
//       trim: true,
//     },
//     habitDate: {
//       type: Date,
//       required: true,
//       validate: {
//         validator: (value: Date) => !isNaN(value.getTime()), // Ensures it's a valid date
//         message: 'Invalid date format',
//       }
//     },
//     targetGoal: {
//       type: Number,
//       required: true,
//       trim: true, // probably overkill, but just in case.
//     },
//     targetGoalUnit: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     actualPerformance: {
//       type: Number,
//       required: true,
//       trim: true,
//     },
//     actualPerformanceUnit: {
//       type: String,
//       required: true,
//       trim: true
//     }
//   }
// );

// const Habit = model<IHabit>('Habit', habitSchema);

// export default Habit;
