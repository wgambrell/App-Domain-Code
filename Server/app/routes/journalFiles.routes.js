const db = require('../config/db.config.js');
const Sequelize = require('sequelize');
const uploadFiles = db.journalFiles;
var fs = require('fs');




const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
   //dest: 'uploads/'
    storage: storage
})


module.exports = function(app) {
    var journalFiles = require('../controllers/journalFiles.controller.js');

    // Create a new journal
    app.post('/api/journalFiles', upload.single('file'), (req, res,) => {
        if(!req.file){
            console.log("no file received");
        }
        else{
            var fileData = fs.readFileSync('./uploads/' + req.file.filename);
            console.log(req.file.filename);
            uploadFiles.create({
                FileData: fileData,
                JournalID: 1
            }).then(upFile => {
                res.json(upFile.FileId);
            })
        }

    });

    app.post('/api/retreiveJournalFiles', (req, res) =>{
        let ID = req.body.jID;
        uploadFiles.findOne({where:{FileId: ID }}).then(file => {
            res.send(file.FileData);
        })

    });
    // Retrieve a single journal by Id
    //app.get('/api/journalFiles:entry', journalFiles.findById);
}