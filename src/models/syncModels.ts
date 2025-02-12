import User from "./userModel";
import Workout from "./workoutLoggingModel";
import FitnessGoal from "./fitnessModel";
import FeedbackIssue from "./FeedbackIssueModel";

const syncTables=async()=>{
    await User.sync({alter: true});
    console.log('User Table synced successfully.');
    
    await Workout.sync({ alter: true });
    console.log('Workout table synced successfully.');

    await FitnessGoal.sync({alter:true});
    console.log('FitnessGoal Table synced successfully.');

    await FeedbackIssue.sync({alter:true});
    console.log('FeedbackIssue Table synced successfully.');
}

export default syncTables;