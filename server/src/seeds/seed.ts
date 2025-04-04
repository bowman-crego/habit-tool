import db from '../config/connection.js';
import { Habit, User } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
import habitData from './habitData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    //await Thought.insertMany(thoughtData);
    
    //initial attempt
    //await Habit.insertMany(habitData);
    //await User.create(userData);
    
    // Create users
    await User.create(userData);

    // Create habits and associate them with users
    const habits = await Habit.insertMany(habitData);
    //associating habits to users test
    for (const habit of habits) {
      // Find the user by habitUsername and update their habits array
      await User.findOneAndUpdate(
        { username: habit.habitUsername },
        { $addToSet: { habits: habit._id } }
      );
    }
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
