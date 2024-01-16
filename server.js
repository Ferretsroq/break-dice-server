import restify from 'restify';
import fs from 'fs';

let server = restify.createServer();

function respond(req, res, next)
{
    res.send('hello ' + req.params.name);
    next();
}

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.use(restify.plugins.bodyParser())

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

server.post('/foo',
    function(req, res, next) {
        req.someData = 'foo';
        return next();
    },
    function(req, res, next) {
        res.send(req.someData);
        return next();
    }
);

server.post('/table',
    function(req, res, next) {
        const roll = Math.floor(Math.random()*100)+1
        const id = req.body.id;
        let table = null;
        for(let i = 0; i < data.length; i++)
        {
            if(data[i]['$id'] == id)
            {
                table = data[i]['Oracles'][0]['Table'];
            }
        }
        for(let i = 0; i < table.length; i++)
        {
            if(table[i]['Floor'] <= roll && table[i]['Ceiling'] >= roll)
            {
                req.result = table[i]['Result'];
            }
        }
        return next();
    },
    function(req, res, next) {
        res.send(req.result);
        return next();
    }
);

const data = JSON.parse(fs.readFileSync('./data/Ironsworn_oracles.json', 'utf8'))