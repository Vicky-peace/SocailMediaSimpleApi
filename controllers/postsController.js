import sql from 'mssql';
import config from '../db/config.js';


// Create a new  post

export const createPost = async (req,res) =>{
    try{
       const {title,user_id, content} = req.body;
       let pool = await sql.connect(config.sql);
       const result = await pool.request()
       .input('title', sql.VarChar, title)
       .input('content', sql.VarChar, content)
       .input('user_id', sql.Int, user_id)
       .query('INSERT INTO Posts (title, content, user_id) VALUES (@title, @content, @user_id) ');
    //    const postId = result.recordset[0].postId;
    //    const newPost = {post_id, title, content, user_id};
       console.log(result.recordset)
       res.status(200).send('Posts created successfully')
    //    res.status(201).json(newPost);
    }catch(err){
        console.error(err);
      res.status(500).json({error:'Failed to create post'});
    } finally{
        sql.close();
    }
}
 
// Retrieve all post
export const getPosts = async (req,res) => {
    try{
let pool = await sql.connect(config.sql);
const result = await pool.request()
.query('SELECT * FROM Posts');
res.status(200).json(result.recordset);

    }catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve post' });
    } finally{
        sql.close();
    }
}

// Retrieve a single post
export const getPost = async (req,res) =>{
    try{
        const {post_id} = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('post_id', sql.Int, post_id)
        .query('SELECT * FROM Posts WHERE post_id = @post_id');
        res.status(200).json(result.recordset);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve post' });
    } finally{
        sql.close();
    }
};

// Update a post

export const updatePost = async (req,res) =>{
    try{
        const {post_id} = req.params;
        const {title, content} = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
       .input('post_id', sql.Int, post_id)
       .input('title', sql.VarChar, title)
       .input('content', sql.VarChar, content)
       .query('UPDATE Posts SET title = @title, content = @content WHERE post_id = @post_id');
        res.status(200).json({message: 'Successfully updated post'});
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to update post' });
    } finally{
        sql.close();
    }
};


// Delete a post
export const deletePost = async (req,res) =>{
    try{
        const {post_id} = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
      .input('post_id', sql.Int, post_id)
      .query('DELETE FROM Posts WHERE post_id = @post_id');
        res.status(200).json(result.recordset);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to delete post' });
    } finally{
        sql.close();
    }
};