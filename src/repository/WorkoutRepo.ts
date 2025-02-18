import sequelize from "../db";

export const getAllWorkouts = async (): Promise<any> => {
    const [workouts]: any = await sequelize.query("SELECT * FROM workouts");
    return workouts;
};

export const getWorkoutsByUser = async (userId: number): Promise<any> => {
    const [workouts]: any = await sequelize.query("SELECT * FROM workouts WHERE user_id = ?", {
        replacements: [userId]
    });
    return workouts;
};

export const createWorkout = async (userId: number, exerciseType: string, duration: number, caloriesBurned: number, workoutDate: string): Promise<void> => {
    await sequelize.query("INSERT INTO workouts (user_id, exercise_type, duration, calories_burned, workout_date) VALUES (?, ?, ?, ?, ?)", {
        replacements: [userId, exerciseType, duration, caloriesBurned, workoutDate]
    });
};

export const findWorkout = async (userId: number, workoutDate: string, exerciseType: string): Promise<any> => {
    const [existingExercise]: any = await sequelize.query("SELECT * FROM workouts WHERE workout_date = ? AND exercise_type = ? AND user_id = ?", {
        replacements: [workoutDate, exerciseType, userId]
    });
    return existingExercise;
};

export const getWorkoutById = async (workoutId: number): Promise<any> => {
    const [workout]: any = await sequelize.query("SELECT * FROM workouts WHERE workout_id = ?", {
        replacements: [workoutId]
    });
    return workout;
};

export const updateWorkout = async (userId: number, workoutId: number, exerciseType: string, duration: number, caloriesBurned: number, workoutDate: string): Promise<void> => {
    await sequelize.query("UPDATE workouts SET exercise_type = ?, duration = ?, calories_burned = ?, workout_date = ? WHERE user_id = ? AND workout_id = ?", {
        replacements: [exerciseType, duration, caloriesBurned, workoutDate, userId, workoutId]
    });
};

export const deleteWorkout = async (userId: number, workoutId: number): Promise<void> => {
    await sequelize.query("DELETE FROM workouts WHERE user_id = ? AND workout_id = ?", {
        replacements: [userId, workoutId]
    });
};
