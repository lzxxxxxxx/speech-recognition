const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
app.set("views", "./views")
app.set("view engine", "ejs")
const { spawnSync } = require('child_process');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


function uploadFile(req, res, next) {//函数内有next的一定参数内也要有next

    upload.single('audio')(req, res, function (err) {
        if (err) {
            console.log("1")
        } else {
            next();
        }
    });

}

app.get('/', (req, res) => {
    res.render("page")
});
app.post('/python', uploadFile, (req, res) => {
    console.log(req.file.filename)
    const py = spawnSync('D:\\anaconda\\envs\\modelyy1\\python.exe', ['D:\\yuyin\\asr\\whisper-main\\test02.py', 'D:\\yuyin\\speech-recognition\\uploads\\']);
    console.log('yes')

    /*fs.unlink(path.resolve('uploads/' + req.file.filename), (err) => {//删除语音文件.wav
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting the file');
        }
    });*/


    fs.readFile('D:\\yuyin\\speech-recognition\\uploads\\' + req.file.filename.slice(0, -3) + 'txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        console.log('D:\\yuyin\\speech-recognition\\uploads\\' + req.file.filename.slice(0, -3) + 'txt')
        res.json({ content: data });
    });

    /* fs.unlink(path.resolve('uploads/' + req.file.filename .slice(0,-3)+ 'txt'), (err) => {//删除结果文件.txt
         if (err) {
             return res.status(500).send('Error deleting the file');
         }
     });*/

});

