import sql from 'mssql';
import config from '../db/config.js';


// Create a comment

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;

    let pool = await sql.connect(config.sql);
    const result = await pool.request()
     .input('content', sql.VarChar, content)
     .query('INSERT INTO Comments ( content) values ( @content)');

    res.status(201).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally{
    sql.close();
  }
};

// Get all comments

export const getComments = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request()
    .query('select * from comments');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally{
    sql.close();
  }
};

// update comment

export const updateComment = async (req, res) => {
  try {
    const {comment_id} = req.params;
    const {  content } = req.body;

    let pool = await sql.connect(config.sql);
    let result = await pool.request()
    .input('comment_id', sql.VarChar, comment_id)
    .input('content', sql.VarChar, content)
    
    .query('UPDATE Comments SET content = @content WHERE comment_id = @comment_id');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally{
    sql.close();
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
    try{
        const {comment_id} = req.params;
        let pool = await sql.connect(config.sql);
        let result = await pool.request()
        .input('comment_id', sql.Int, comment_id)
        
       .query('DELETE FROM Comments WHERE comment_id = @comment_id');
       
        res.status(200).json(result.recordset);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    } finally {
        sql.close();
    }
}

// get a single comment

export const getComment = async (req, res) => {
  try {
    const {comment_id} = req.params;

    let pool = await sql.connect(config.sql);
    const result = await pool.request()
   .input('comment_id', sql.VarChar, comment_id)
   .query('SELECT * FROM Comments WHERE comment_id = @comment_id');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally{
    sql.close();
  }
};