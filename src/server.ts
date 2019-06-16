import app from "./app";
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})