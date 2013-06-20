#!/usr/bin/python 
import os
f=os.popen('pelican . -o ../ -s pelicanconf.py')
for i in f.readlines():
     print "myresult:",i,
