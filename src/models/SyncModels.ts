import User from "./UserModel";
import Workout from "./WorkoutLoggingModel";
import FitnessGoal from "./FitnessModel";
import FeedbackIssue from "./FeedbackIssueModel";

//Syncing All The Models Created
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