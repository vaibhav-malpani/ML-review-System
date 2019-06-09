import urllib
import sys
from bs4 import BeautifulSoup

uniquiId = sys.argv[1]
html_imdb=urllib.urlopen("https://www.imdb.com/title/"+uniquiId+"/reviews?sort=helpfulnessScore&dir=desc&ratingFilter=0")
soup = BeautifulSoup(html_imdb, 'html.parser')
data = soup.find_all("div", {'class':'text show-more__control'})

if(len(data) > 0):
	for div in data:
		review = str(div).replace('<div class="text show-more__control">','').replace('</div>','').replace('<br/>','')
		print (review + '\n')
else:
	print("failure")