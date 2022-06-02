import requests
from bs4 import BeautifulSoup

soup = BeautifulSoup(open('steam_page.html').read(), 'html.parser')
links = [a['href'] for a in soup.find_all('a') if a.has_attr('href') and a['href'].startswith('https://steamuserimages-a.akamaihd.net/ugc/')]
for i, url in enumerate(links):
  print(i)
  filename = 'img_raw/' + url.split('/')[-2] + '.jpg'
  data = requests.get(url).content
  open(filename, 'wb').write(data)
