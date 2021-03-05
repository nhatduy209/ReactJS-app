var express = require("express");
var path = require('path');
var exphbs = require('express-handlebars');
var app = express();

// khai báo sử dụng engine 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// khai báo views nằm trong đường dẫn nào 
app.set('views', path.join(__dirname, 'views'))
app.use(express.static("public")); // các request customer gửi lên thì vào public tìm
console.log(path.join(__dirname, 'views'))
var bodyparse = require("body-parser"); // sử dụng để gửi giá trị tới server
var parser = bodyparse.urlencoded({ extended: false });
app.listen(3000); // mở cổng để customer gọi server 

var notes = ["hoc online", "ruoc coca"];
app.get("/", function (req, res)// req là param khách hàng gửi lên 
// res là param server trả về
{
    res.render("home");  // main.handelbars
});

app.post("/getnotes", function (req, res) {
    res.send(notes);
});

app.post("/addnotes", parser, function (req, res) {     // hạm để truyền lên server 
    var newNote = req.body.note;
    notes.push(newNote)
    res.send(notes)
});

app.post("/deletenotes", parser, function (req, res) {
    var id = req.body.idXoa;
    notes.splice(id, 1);
    res.send(notes)
})


app.post("/editnotes", parser, function (req, res) {
    var newNote = req.body.idSua;
    var textNote = req.body.idTxt;
    notes[newNote] = textNote;
    res.send(notes)
})