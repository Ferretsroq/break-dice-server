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
        console.log(`Got request:\n${req.getQuery()}`);
        const id = req.body.id;
        try
        {
            req.result = RollOnOracle(GetOracle(id));
        }
        catch
        {
            req.result = 'Error'
        }
        return next();
    },
    function(req, res, next) {
        res.send(req.result);
        return next();
    }
);

let data = [];
const files = fs.readdirSync('./data');
for(let i = 0; i < files.length; i++)
{
    if(files[i].endsWith('.json'))
    {
        data = data.concat(JSON.parse(fs.readFileSync(`./data/${files[i]}`, 'utf8')));
    }
}
//const data = JSON.parse(fs.readFileSync('./data/Ironsworn_oracles.json', 'utf8'))


function GetOracle(id)
{
    const splitID = id.split('/');
    let parentOracle = data.find(oracle => oracle['$id'].startsWith(`${splitID[0]}/${splitID[1]}/${splitID[2]}`));
    let depth = 3;
    for(let oracleIndex = 0; oracleIndex < parentOracle['Oracles'].length; oracleIndex++)
    {
        if(parentOracle['Oracles'][oracleIndex]['$id'] === id)
        {
            return parentOracle['Oracles'][oracleIndex]['Table'];
        }
    }
    while(Object.keys(parentOracle).includes('Oracles'))
    {
        depth++;
        let depthString = '';
        for(let split = 0; split < depth; split++)
        {
            depthString += `${splitID[split]}/`;
        }
        depthString = depthString.slice(0,-1);
        console.log(depthString);
        parentOracle = parentOracle['Oracles'].find(oracle => oracle['$id'].startsWith(depthString));
        for(let oracleIndex = 0; oracleIndex < parentOracle['Oracles'].length; oracleIndex++)
        {
            if(parentOracle['Oracles'][oracleIndex]['$id'] === id)
            {
                return parentOracle['Oracles'][oracleIndex]['Table'];
            }
        }
    }
}

function RollOnOracle(oracle)
{
    let result = '⏵';
    while(result.includes('⏵'))
    {
        const roll = Math.floor(Math.random()*oracle[oracle.length-1]['Ceiling'])+1
        for(let i = 0; i < oracle.length; i++)
        {
            if(oracle[i]['Floor'] <= roll && oracle[i]['Ceiling'] >= roll)
            {
                return oracle[i]['Result'];
            }
        }
    }
    return '';
}