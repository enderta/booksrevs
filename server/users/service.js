const bcrypt = require("bcrypt");
const pool = require("../db.config");
const jwt = require("jsonwebtoken");


exports.registerUser = async (userData) => {
    const { username, password, email } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    if(username.length < 1){
        return {
            status: "error",
            message: "Username cannot be empty",
        };
    }
    if(email.length < 1){
        return {
            status: "error",
            message: "Email cannot be empty",
        };
    }
    if(password.length < 1){
        return {
            status: "error",
            message: "Password cannot be empty",
        };
    }

    // Check if username is already taken
    const userWithSameUsername = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userWithSameUsername.rows.length > 0) {
        return {
            status: "error",
            message: "Username is already taken",
        };
    }

    // Check if email is already taken
    const userWithSameEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userWithSameEmail.rows.length > 0) {
        return {
            status: "error",
            message: "Email is already taken",
        };
    }

    // If username and email are not taken, insert new user with role 'user'
    const user = await pool.query(
        "INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, hashedPassword, email, 'user']
    );

    return {
        status: "success",
        message: `User ${username} registered successfully`,
        data: user.rows[0],
    };
};

exports.loginUser = async (userData) => {
    const { username, password } = userData;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) {
        return {
            status: "error",
            message: "User not found",
        };
    } else {
        const match = await bcrypt.compare(password, user.rows[0].password);
        if (match) {
            const token = jwt.sign(
                { id: user.rows[0].id, role: user.rows[0].role },
                process.env.SECRET,
                { expiresIn: "1h" }
            );
            return {
                status: "success",
                message: "User logged in successfully",
                token: token,
                user: user.rows[0]
            };
        } else {
            return {
                status: "error",
                message: "Incorrect password",
            };
        }
    }
};

exports.getUsers = async () => {
    try {
        const result = await pool.query("SELECT * FROM users");
        return {
            status: 'success',
            message: `Retrieved ${result.rows.length} users`,
            data: result.rows
        };
    } catch (err) {
        console.error(err);
        throw new Error("Error while getting users from the database");
    }
};

exports.getUserById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return {
                status: "error",
                message: "User not found",
            };
        } else {
            return {
                status: "success",
                message: `Retrieved user with id ${id}`,
                data: result.rows[0]
            };
        }
    } catch (err) {
        console.error(err);
        throw new Error("Error while getting user from the database");
    }
};

exports.updateUser = async (id, userData) => {
    const { username, password, email } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
        "UPDATE users SET username = $1, password = $2, email = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
        [username, hashedPassword, email, id]
    );
    return {
        status: "success",
        message: `User ${username} updated successfully`,
        data: user.rows[0],
    };
};

exports.deleteUser = async (id) => {
    const user = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return {
        status: "success",
        message: `User ${user.rows[0].username} deleted successfully`,
        data: user.rows[0],
    };
};