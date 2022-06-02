import requests
from bs4 import BeautifulSoup

for i in range(1, 47):
  print(i)
  url = 'https://zh.hentai-img.com/image/ahegao-collection-v1-v1/page/' + str(i)
  soup = BeautifulSoup(requests.get(url).text, 'html.parser')
