const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var list = [
    {
        id: 1,
        title: 'test1',
        description: 'description 1'
    }
];

app.get('/hello', (req, res) => {
    res.send('merhaba express');
});

app.post('/createNewTask', (req, res) => {
    
    console.log(req.body);
    
    const task_id = req.body.id;
    //const token = req.body.token;
    const title = req.body.title;
    const description = req.body.description;
    
    list.push({
        id: task_id,
        title: title,
        description: description
    });
    
    console.log('Yeni Liste: ');
    console.log(list);
    res.send('Yeni Task Oluşturuldu.');
});

app.put('/updateTask', (req, res) => {

    if (req.body.id) {
        res.send('Task Güncellendi. Yeni Task Bilgileri: ' + JSON.stringify(req.body));
    } else {
        res.send('Update Failed');
    }
    
});

app.delete('/delete', (req, res) => {
    if (req.body.id) {
        res.send(req.body.id + ' id li Task silindi.');
    } else {
        res.send('Delete Failed');
    }
});

app.listen(3001, () => {
    console.log('express server çalıştı...');
});