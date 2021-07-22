"use strict";

const db = require("../db");

// const { sqlForPartialUpdate } = require("../helpers/sql");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class UserPosts{

  static async getAllPosts(){
    let response = await db.query('SELECT * FROM user_posts')
    if(response){
      return response.rows
    }else{
      return null
    }
  }

  static async getUserPosts(username){
    let response = await db.query('SELECT * FROM user_posts WHERE username = $1', [username])
    if(response.rows){
      return response.rows
    }else{
      return null
    }
  }

  static async addPost(username, post_text, post_title, recipeToShare = null, recipe_url = null){
    console.log('this is the testarea', post_text, 'this is the title info', post_title)
      let response = await db.query('INSERT INTO user_posts (username, post_text, post_title, recipe_name, recipe_url) VALUES ($1, $2, $3, $4, $5)', [username, post_text, post_title, recipeToShare, recipe_url],);
      console.log(response)
    }
  
  static async addComment(username, comment, postId){
    let response = await db.query('INSERT INTO comments (post_id, username, comment_text) VALUES ($1, $2, $3)', [postId, username, comment],);
    if(response){
      return true
    }else{
      return false
    }
  }

  static async getComments(postId){
    let response = await db.query('SELECT * FROM comments WHERE post_id = $1', [postId],);
    if(response){
      return response.rows
    }else{
      return null
    }
  }
}

module.exports = UserPosts