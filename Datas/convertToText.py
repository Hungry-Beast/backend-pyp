import PyPDF4
path='./electrical-sylabus.pdf'
# creating a pdf file object
pdfFileObj = open(path, 'rb')
#creating a pdf reader object
pdfReader = PyPDF4.PdfFileReader(pdfFileObj)
#printing number of pages in pdf file
print(pdfReader.numPages)
#creating a page object
pageObj = pdfReader.getPage(0)
pypdf2_text=''
# extracting text from page
for i in range(pdfReader.numPages):
    pypdf2_text +=pdfReader.getPage(i).extractText()
print(pypdf2_text)
fp=open('./electrical-sylabus.txt','w')
fp.write(pypdf2_text)
#closing the pdf file object
pdfFileObj.close()