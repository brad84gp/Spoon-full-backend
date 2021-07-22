"use strict";

const db = require("../db");

// const { sqlForPartialUpdate } = require("../helpers/sql");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class UserListModel{

    static async getGroceries(username){
      console.log(username)
      let response = await db.query('SELECT * FROM grocery_list WHERE username = $1', [username],);
      let grocery_list = response.rows
      if(grocery_list){
        return grocery_list
      }

      return null
    }

    static async addGroceries(username, title, item_id){
        const response = await db.query('INSERT INTO grocery_list (username, product_name, product_id) VALUES ($1, $2, $3)', [username, title, item_id],);
        if(response) return true

        return false
      }

    static async getRecipeId(recipeName){
      let response = await db.query('SELECT recipe_id FROM favorite_recipes WHERE recipe_name = $1', [recipeName])
      console.log(response.rows[0])
      return response.rows[0]
    }

    static async getRecipes(username){
      let response = await db.query('SELECT * FROM favorite_recipes WHERE username = $1', [username])
      if(response) return response.rows
      return null
    }

    static async addFavoriteRecipe(username, recipe_id, recipe_name){
      const response = await db.query('INSERT INTO favorite_recipes (username, recipe_id, recipe_name) VALUES ($1, $2, $3)', [username, recipe_id, recipe_name],);
      if(response) return true

      return false
    }

}

module.exports = UserListModel