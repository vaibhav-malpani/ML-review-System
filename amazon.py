import urllib
import sys
from bs4 import BeautifulSoup

uniquiId = sys.argv[1]
html_amazon=urllib.urlopen("https://www.amazon.in/product-reviews/"+uniquiId)
soup = BeautifulSoup(html_amazon, 'html.parser')
data = soup.find_all("span", {'class':'a-size-base review-text'})

if(len(data) > 0):
	for div in data:
		review = str(div).replace('<span class="a-size-base review-text" data-hook="review-body">','').replace('</span>','').replace('<br/>',' ')
		print (review + '\n')
else:
	print("failure")