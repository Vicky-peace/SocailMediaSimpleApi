import sql from 'mssql';
import config from '../db/config.js';

// get all users

export const getUsers= async (req,res) =>{
    try{
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .query('SELECT * FROM Users')
        res.status(200).json(result.recordset);

    } catch(error){
        console.error(error);
        res.status(201).json(error.message);
    } finally{
        sql.close();
    }
}

// Create a user

export const createUser = async (req,res) =>{
    try{
       const {username,email,password} = req.body;
       let pool = await sql.connect(config.sql);
       await pool.request()
       .input('username', sql.VarChar, username)
       .input('email', sql.VarChar, email)
       .input('password', sql.Int, password)
       .query('INSERT INTO Users (username, email, password) VALUES (@username,@email,@password)');
       res.status(201).json('User created');
    }catch (error){
         console.error(error);
         res.status(201).json(error.message);
    } finally{
        sql.close();
    }
};
    // Get one user
    export const getUser = async (req,res) => {
        try{
            const {user_id} = req.params;
            let pool = await sql.connect(config.sql);
            const user1 = await pool.request()
            .input('user_id', sql.Int, user_id)
             .query('SELECT * FROM Users WHERE user_id = @user_id');
            // //  console.log(user1);
            //  !user1.recordeset[0]? res.status(404).json({message: 'User not found'}) : res.status(200).json({status:'success',user:user1.recordeset[0]});
            // //  console.log(user1.recordset[0])
            res.status(200).json(user1.recordset[0]);

        } catch (error) {
            console.error(error);
            res.status(201).json(error.message);
        } finally{
            sql.close();
        }
    }


    // Update one user

    export const updateUser= async (req,res) => {
        try{
            const {user_id} = req.params;
                        const {email,username,password} = req.body;
                        let pool = await sql.connect(config.sql);
                       await pool.request()
                      .input('user_id', sql.Int, user_id)
                      .input('email', sql.VarChar, email)
                      .input('username', sql.VarChar, username)
                      .input('password', sql.Int, password)
                      .query('UPDATE Users SET email = @email, username = @username, password = @password WHERE user_id = @user_id');
                      res.status(200).json({message: 'User updated successfully'});

        } catch (error) {
         console.error(error);
         res.status(201).json(error.message);
        } finally{
           sql.close();
        }
    }

    // Delete a user
    export const deleteUser = async (req,res) =>{
        try{
           const {user_id} =req.params;
           let pool = await sql.connect(config.sql);
           await pool.request()
           .input('user_id', sql.Int, user_id)
           .query('DELETE FROM Users WHERE user_id = @user_id');
           res.status(200).json({message: 'User deleted successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'An error occurred while deleting a user'});
        }finally{
            sql.close();
        }
    }