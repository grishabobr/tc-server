const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;

// serve static files built by React
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.use(express.json());

app.post('/tryp', function (request, response) {
    
    setTimeout(() => {
        response.send({
            index: {
                indexFrom: "123456",
                indexTo: "456789"
            },
            distance: 228,
            price: Number(request.body.Width) + Number(request.body.Height) + Number(request.body.Length)
        });
    }, 1000)
    
});


app.listen(port, () => {
    console.log('Server started on: ' + port);
});