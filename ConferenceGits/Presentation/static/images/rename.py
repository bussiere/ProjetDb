import os
import re
import Image


def resize(nomfi):
    size = 250,250
    try:
        im = Image.open(nomfi)
        im.thumbnail(size, Image.ANTIALIAS)
        outfile = "%s_thumb.jpg"%(nomfi.split(".")[0])
        im.save(outfile, "JPEG")
    except IOError:
        print "cannot create thumbnail for '%s'" % nomfi

def renamefile(nomfi,i):
    print nomfi
    print i
    ok = False
    prog2 = re.compile("^_0.*\.jpg")
    result2 = prog2.match(nomfi)
    if (not result2) :
        while (not ok) :
            try :
                nom = "_0%d.jpg"%i
                if nom not in dirList :
                    os.rename(nomfi,"_0%d.jpg"%i)
                    nomfi = "_0%d.jpg"%i
                    ok = True
                
            except :
                    i+= 1
    return nomfi
    

def operationfichier(nomfi,i,dirList):
    prog2 = re.compile(".*_thumb\.jpg")
    result2 = prog2.match(nomfi)
    if not result2 :
        prog = re.compile(".*\.py")
        result = prog.match(nomfi)
        if not result :
            if nomfi not in dirList :
                nomfi = renamefile(nomfi,i,dirList)
            resize(nomfi)
            i += 1
    return i

path="."
dirList=os.listdir(path)
i = 0
for nomfi in dirList:
    print nomfi
    i = operationfichier(nomfi,i,dirList)
