import http from 'http';
//const payload = 'Ironsworn/Oracles/Action_and_Theme';

/*const urlparams = {
    protocol: 'http:',
    host: 'localhost',
    port: 8080,
    path: '/table',
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'Content-Length': JSON.stringify({'id': payload}).length}
            }*/





//req.write(JSON.stringify({'id': payload}));
//req.end();

function GetResult(payload)
{
    const urlparams = {
        protocol: 'http:',
        host: 'localhost',
        port: 8080,
        path: '/table',
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Content-Length': JSON.stringify({'id': payload}).length}
                }
    const req = http.request(urlparams, (res) => {
                    res.setEncoding('utf8');
                    
                    res.on('data', (chunk) => {
                        console.log(`BODY: ${chunk}`);
                    });
                    res.on('error', (e) => {
                        console.log(e);
                    });
                });
    req.write(JSON.stringify({'id': payload}));
    req.end();
}


await GetResult('Ironsworn/Oracles/Action_and_Theme');
await GetResult('Ironsworn/Oracles/Settlement');
await GetResult('Ironsworn/Oracles/Turning_Point');
await GetResult('Ironsworn/Oracles/Moves');