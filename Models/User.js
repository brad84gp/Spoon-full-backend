
"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
// const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");



class User{

    static async registerUser({username, password, first_name, last_name, email}){

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)


        let newUser = await db.query(`INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) 
                                        RETURNING username, first_name, last_name, email`, [username, hashedPassword, first_name, last_name, email],);
        const user = newUser.rows[0]
        return user;
    }

    static async loginUser({username, password}){

        const result = await db.query('SELECT * FROM users WHERE username = $1', [username],);
        const user = result.rows[0]

        if(user){
            const checkPassword = await bcrypt.compare(password, user.password)
            if(checkPassword){
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    static async editUserProfile({username, password = null, first_name, last_name, email}, user){
        if(password != null){
            const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
            
            const response = await db.query('UPDATE users SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5 WHERE username = $6',[username, hashedPassword, first_name, last_name, email, user],);
            
            return response.rows[0]
        }

        const response = await db.query('UPDATE users SET username = $1, first_name = $2, last_name = $3, email = $4 WHERE username = $5 RETURNING username, first_name, last_name, email',[username, first_name, last_name, email, user],);
            
        return response.rows[0]

        

    }

    static async deleteUser(user){
        const userFound = await db.query('SELECT username FROM users WHERE username = $1', [user])
        const username = userFound.rows[0].username
        if(userFound){
            await db.query(`DELETE FROM users WHERE username = $1`, [username],);
            return true
        }

        return false
    }
    

    
}

module.exports = User