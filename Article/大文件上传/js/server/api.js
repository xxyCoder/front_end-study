const express = require('express');
const bodyParser = require('body-parser');
const multiparty = require('multiparty')
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/formData", function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, function (err, fields, file) {
        if (err) {
            res.sendStatus(500);
            res.end("server error");
        } else {
            console.log(fields, file);
            res.end("end");
        }
    })
});


app.listen(3000);