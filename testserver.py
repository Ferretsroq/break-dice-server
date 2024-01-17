import requests

url = 'http://18.220.137.34:8080/table'

def GetResult(payload):
    payloadobj = {'id': payload}
    response = requests.post(url=url, data=payloadobj)
    return response.text.strip('"')

print(GetResult('Ironsworn/Oracles/Action_and_Theme/Action'))
print(GetResult('Starforged/Oracles/Core/Action'))
print(GetResult('Worlds_Without_Number/Oracles/History/Why_fail'))
print(GetResult('Spectacular_Settlements/Oracles/Points_of_Interest/Non-Commercial_Location_Type/Non-Commercial Location Type/Places_of_Education/Places of Education'))