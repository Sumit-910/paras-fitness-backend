import sequelize from "../db";

export const getAllFitnessGoals = async (userId: number): Promise<any> => {
    const [fitnessGoals]: any = await sequelize.query("SELECT * FROM fitness_goals WHERE user_id = ?", {
        replacements: [userId]
    });
    return fitnessGoals;
};

export const getSingleFitnessGoal = async (goalId: number): Promise<any> => {
    const [goal]: any = await sequelize.query("SELECT * FROM fitness_goals WHERE goal_id = ?", {
        replacements: [goalId]
    });
    return goal;
};

export const createFitnessGoal = async (userId: number, goalType: string, targetValue: number, currentProgress: number, startDate: string, endDate: string): Promise<void> => {
    await sequelize.query(
        "INSERT INTO fitness_goals (user_id, goal_type, target_value, current_progress, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)", 
        { replacements: [userId, goalType, targetValue, currentProgress, startDate, endDate] }
    );
};

export const updateFitnessGoal = async (goalId: number, targetValue: number, currentProgress: number, status: string): Promise<void> => {
    await sequelize.query(
        "UPDATE fitness_goals SET target_value=?, current_progress=?, status=? WHERE goal_id=?", 
        { replacements: [targetValue, currentProgress, status, goalId] }
    );
};

export const deleteFitnessGoal = async (goalId: number): Promise<void> => {
    await sequelize.query("DELETE FROM fitness_goals WHERE goal_id=?", { replacements: [goalId] });
};
