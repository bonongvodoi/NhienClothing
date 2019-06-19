import app from "./app";
import { isProduction } from "./config/config";
console.log(process.env.PORT);

const PORT = isProduction ? 5000 : 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})