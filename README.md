# node-oracledb-issue
Put ``Oracle instantclient`` ``into dependencies/instantclient folder``

To run the project from root directory run 
``docker-compose  upp`` from  root of the project

``query.sql`` script contains test data that has to be populated in oracle DB

Instantclient version used during tests is as follows :
````
Basic Lite Package Information
==============================
Thu Jan 26 05:14:36 PST 2017
Client Shared Library 64-bit - 12.2.0.1.0
System name:	Linux
Release:	2.6.39-400.211.1.el6uek.x86_64
Version:	#1 SMP Fri Nov 15 13:39:16 PST 2013
Machine:	x86_64
Operating in ORACLE_HOME environment.
Small timezone file = timezone_26.dat
Large timezone file = timezlrg_26.dat
````
To reproduce the issue run  ``npm run cannon`` from  root directory 

Check  the rss memory increasing for node process. 

 