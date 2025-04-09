import { Schema, model, Document } from 'mongoose';



interface IHabit extends Document {
  habitText: string;
  habitUsername: string;
  habitDate: Date;
  targetGoal: number;
  targetGoalUnit: string;
  actualPerformance: number;
  actualPerformanceUnit: string;
  progress: number;
}

const habitSchema = new Schema<IHabit>(
  
  {
    habitText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    habitUsername: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100, //This can be whatever we choose. 100 is probably excessive.
      trim: true,
    },
    habitDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => !isNaN(value.getTime()), // Ensures it's a valid date
        message: 'Invalid date format',
      }
    },
    targetGoal: {
      type: Number,
      required: true,
      trim: true, // probably overkill, but just in case.
    },
    targetGoalUnit: {
      type: String,
      required: true,
      trim: true,
    },
    //JBNote: Pulled the required from these since it is possible to miss a day.
    actualPerformance: {
      type: Number,
      trim: true,
      default: 0,
    },
    actualPerformanceUnit: {
      type: String,
      trim: true,
      default: "",
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    }
  }
);

const Habit = model<IHabit>('Habit', habitSchema);

export default Habit;
