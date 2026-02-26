import requests
url = "https://cvtest.stgau.ru/api/models/"
headers = {
    "Authorization": "Bearer 4624f3bf855648ca6acc8f157690ba5a385f9b83db014df2bef40de9551c3bd1"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.text)