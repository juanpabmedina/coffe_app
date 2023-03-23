import requests
 
# Making a POST request
r = requests.post('https://webhook.site/55a8d817-1f71-4494-a355-99a64ca4d0cf', json={'id': 'adioos'}, headers={'Accept': 'application/json',
          'Content-Type': 'application/json'})
 
# check status code for response received
# success code - 200
print(r)