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
        cb(null, 'uploads/'); // �ϴ��ļ��Ĵ洢·��
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ʹ��ʱ�����Ϊ�ļ���
    }
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render("page")
});
app.post('/python1', upload.single('audio'), (req, res) => {//���ñ���.py��ֱ�ӻ�÷���ֵ��.py�ļ����÷���server
        console.log(req.file)
    const py = spawn('D:\\PY\\python.exe', ['D:\\pycharm\\py_projects\\pythonProject6\\test.py',  'C: \Users\24220\source\repos\speech - recognition\speech - recognition/uploads/' +req.file.filename]);


    fs.unlink(path.resolve('uploads/' + req.file.filename), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting the file');
        }
    });



    py.stdout.on('data', function (res) {
        let data = res.toString();
        console.log('stdout: ', data)
    })
    var row =0
        //result.slice(0, 1)
    var col =1
        //result.slice(1)
    res.json({row:row,col:col});
});
app.post('/python2', upload.single('audio'),(req, res) => {
    const py = spawn('D:\\PY\\python.exe', ['D:\\pycharm\\py_projects\\pythonProject6\\test.py','C: \Users\24220\source\repos\speech - recognition\speech - recognition/uploads/'+ req.file.filename]);
    fs.unlink(path.resolve(filePath), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting the file');
        }
    });
    py.stdout.on('data', function (res) {
        let data = res.toString();
        console.log('stdout: ', data)
    })
    res.end(result);
});



app.listen(1337, () => { console.log(1) });


