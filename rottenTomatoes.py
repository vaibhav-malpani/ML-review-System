import urllib
import sys
from bs4 import BeautifulSoup

uniquiId = sys.argv[1]
html_rotten=urllib.urlopen("https://www.rottentomatoes.com/m/"+uniquiId+"/reviews/")
soup = BeautifulSoup(html_rotten, 'html.parser')
data = soup.find_all("div", {'class':'the_review'})


if(len(data) > 0):
	for div in data:
		review = str(div).replace('<div class="the_review">','').replace('</div>','').replace('<br/>',' ')
		print (review + '\n')
else:
	print("failure")