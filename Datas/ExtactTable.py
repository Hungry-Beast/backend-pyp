from tabula import read_pdf
from tabulate import tabulate
 
path='./electrical-sylabus.pdf'
#reads table from pdf file
df = read_pdf(path,pages="all") #address of pdf file
print(tabulate(df))