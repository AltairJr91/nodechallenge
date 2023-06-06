import  express  from "express";
import { router } from "./routes";
import { Middleware } from "./middleware/SecurityMiddleware";

const app = express()

app.use(express.json())
app.use(Middleware)
app.use(router)


app.listen(8000, () => {
    console.log("server running in port 8000");
    
})