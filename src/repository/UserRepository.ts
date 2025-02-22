import sequelize from "../db/index";

// Function to fetch all users from the 'users' table
export const getAllUsers = async () => {
    return await sequelize.query("SELECT * FROM users");
};

// Function to fetch a user based on their email
export const getUserByEmail = async (email: string) => {
    return await sequelize.query("SELECT * FROM users WHERE email = ?", {
        replacements: [email],
    });
};

// Function to fetch a user based on their user_id
export const getUserById = async (id: number) => {
    return await sequelize.query("SELECT * FROM users WHERE user_id = ?", {
        replacements: [id],
    });
};

// Function to insert a new user into the 'users' table
export const insertUser = async (name: string, email: string, password: string, phone: string, address: string) => {
    return await sequelize.query(
        "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
        { replacements: [name, email, password, phone, address] }
    );
};

// Function to update the password of a user based on their email
export const updateUserPassword = async (email: string, newPassword: string) => {
    return await sequelize.query("UPDATE users SET password = ? WHERE email = ?", {
        replacements: [newPassword, email],
    });
};

// Function to delete a user from the 'users' table based on their email
export const deleteUserByEmail = async (email: string) => {
    return await sequelize.query("DELETE FROM users WHERE email = ?", {
        replacements: [email],
    });
};


export const updateUserProfilePic = async (email: string, profilePic: string) => {
    console.log("email repo",email);
    return await sequelize.query('UPDATE users SET profile_pic = ? WHERE email = ?',{
        replacements:[profilePic,email]
    });
};
