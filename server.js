const express = require('express');
const app = express();
const db = require('./database');

app.use(express.json());

app.get(`/hello`, (req, res) => {
    res.json({message: 'Hello World'})
})

//create a post
app.post('/notes', (req,res)=> {
    /** algorithim
     * collect the necessary from the req.body and pass it to the db to add the content create the id and the title in it
    */
   const {title, content}= req.body;
   
   db.run(`INSERT INTO notes (title, content) VALUES (?,?)`, [title, content], err => {
    if(err){
        res.status(500).json({error: 'Failed to create notes'})
        return;
    }
    res.status(201).json({message: 'Note created successfully'})
   })

})

//get alll notes
app.get(`/notes`, (req, res) => {
    db.all(`SELECT * FROM notes`, (err,rows)=>{
        if(err){

            res.status(500).json({error: 'Failed to retrieve notes'})
            return;
        }
        res.status(200).json(rows)
    })
})

//get notes by id
app.get(`/notes/:id`, (req, res) => {
    const id = req.params.id;
    db.all(`SELECT * FROM notes WHERE id = ?`, [id], (err,row)=>{
        if(err){
            res.status(500).json({message: 'Failed to retrieve note'})
            return;
        }if(row.length === 0){
            res.status(404).json({message: 'Note not found'})
            return;
        }else{
            res.status(200).json(row[0])
        }
    })
})

//update notes
app.put(`/notes/:id`, (req, res) => {
    const {title, content} = req.body;
    const id = req.params.id;
    db.run(`UPDATE notes SET title =?, content = ? WHERE id = ?`, [title, content, id], err =>{
        if(err){
            res.status(500).json({message: 'Failed to update note'})
            return;
        }else{
            res.status(200).json({message: 'Note updated successfully'})
            return;
        }
    })
})

//delete note by id
app.delete(`/notes/:id`, (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM notes WHERE id = ?`, [id], err =>{
        if(err){
            res.status(500).json({message: 'Failed to delete note'})
        }
        res.status(200).json({message: 'Note deleted successfully'})
    })
})

app.listen(3000, ()=>  {
    console.log('Server is running on port 3000');
})