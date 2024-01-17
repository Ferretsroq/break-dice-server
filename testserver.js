import http from 'http';

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
                        console.log(chunk.slice(1,-1));
                    });
                    res.on('error', (e) => {
                        console.log(e);
                    });
                });
    req.write(JSON.stringify({'id': payload}));
    req.end();
}


GetResult('Ironsworn/Oracles/Action_and_Theme/Action');
GetResult('Starforged/Oracles/Core/Action');
GetResult('Worlds_Without_Number/Oracles/History/Why_fail');
GetResult('Spectacular_Settlements/Oracles/Points_of_Interest/Non-Commercial_Location_Type/Non-Commercial Location Type/Places_of_Education/Places of Education');