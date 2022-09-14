import path from "path";
import {fileURLToPath} from "url";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import util from "catcto-node-util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'dev' ? 'dev' : 'tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(util.middleware.web.i18n(__dirname + '/locales/{{lng}}.json'));
app.use(util.middleware.web.view);
app.get('/', (req, res) => {
  res.render('index');
});
app.use(util.middleware.web.notfound);
app.use(util.middleware.web.error);

app.listen(process.env.SERVER_PORT, () => {
  util.debug.log(`Server listening at ${process.env.SERVER_PORT}`);
});
