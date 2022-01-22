import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { movieID, getMovies } from "./fetch.js";
import cookieSession  from 'cookie-session';

let latestVisit = 0;

const app = express();

//console.log(document.cookie);
// trust first proxy
app.set('trust proxy', 1) 

app.use(cookieSession({ 
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/', async function (req, res, next) {
    if(req.session.visitDate)
    {
      console.log("date exists " + req.session.visitDate);
      latestVisit = new Date(req.session.visitDate).getTime();
      // latestVisit = 1642291200000; //2022-01-16 (test to see if inpu-text "new" works)
      //latestVisit = 1642464000000; //2022-01-18
    }

  req.session.visitDate = new Date();
  // Update views
  req.session.views = (req.session.views || 0) + 1


  const movies = await getMovies();
  res.render("index", { movies });
    

  for(let m = 0; m < movies.length; m++)
  {
    console.log("latestVisit"+ latestVisit);
      if(new Date(movies[m].attributes.publishedAt).getTime() > latestVisit)
      {
        let textNew = "(New) ";
        movies[m].attributes.title = textNew + movies[m].attributes.title;
      }
  }
});

app.get("/movies/:movieId", async (request, response) => {
      const movie = await movieID(request.params.movieId);
      if (movie) {
        response.render("movie", { movie });
      } else {
        response.status(404).end();
      }
    });

app.engine("handlebars", engine({
    helpers: {
      markdown: _ => marked(_),
    },
  }));


app.set("view engine", "handlebars");
app.set("views", "./templates");
app.use('/',express.static('./files/static'));

export default app;