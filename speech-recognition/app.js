const express = require('express');
const app = express();
app.set("views", "./views")
app.set("view engine", "ejs")
var spawn = require('child_process').spawn;
app.get('/', (req, res) => {
    res.render("page")
});
app.get('/python1', (req, res) => {//���ñ���.py��ֱ�ӻ�÷���ֵ��.py�ļ����÷���server
        
    const py = spawn('D:\\PY\\python.exe', ['D:\\pycharm\\py_projects\\pythonProject6\\test.py']);
    py.stdout.on('data', function (res) {
        let data = res.toString();
        console.log('stdout: ', data)
    })
    var row = result.slice(0, 1)
    var col = result.slice(1)
    res.json({row:row,col:col});
});
app.get('/python2', (req, res) => {
    const py = spawn('D:\\PY\\python.exe', ['D:\\pycharm\\py_projects\\pythonProject6\\test.py']);
    py.stdout.on('data', function (res) {
        let data = res.toString();
        console.log('stdout: ', data)
    })
    res.end(result);
});
app.listen(1337, () => { console.log(1) });