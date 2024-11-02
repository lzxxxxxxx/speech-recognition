const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
app.set("views", "./views")
app.set("view engine", "ejs")
var spawn = require('child_process').spawn;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render("page")
});
app.post('/python', upload.single('audio'), (req, res) => {
    console.log(req.file.filename)
    //const py = spawn('D:\\PY\\python.exe', ['D:\\pycharm\\py_projects\\pythonProject6\\test.py', 'C:\\Users\\24220\\source\\repos\\speech-recognition\\speech-recognition\\uploads']);

   /* py.stdout.on('data', function (res) {//等python返回再删除，防止python还未完成就删了
        let data = res.toString();
        console.log('stdout: ', data)
    })*/
    /*fs.unlink(path.resolve('uploads/' + req.file.filename), (err) => {//删除语音文件wav
       if (err) {
           console.error(err);
           return res.status(500).send('Error deleting the file');
       }
    });*/


    fs.readFile('C:\\Users\\24220\\source\\repos\\speech-recognition\\speech-recognition\\uploads\\test.txt' , 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        if (data == "结束")
            res.json({ location: "end", content: "end" });
        let location1 = data.slice(2,6)
        let content1 = data.slice(8,data.length)
        res.json({ location: location1, content: content1 });
    });
    
    /*fs.unlink(path.resolve('uploads/' + req.file.filename.slice(0, -3) + 'txt'), (err) => {//删除结果文件txt
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting the file');
        }
    });*/

});



app.listen(1337, () => { console.log(1) });