FROM wnameless/oracle-xe-11g-r2
COPY query.sql /docker-entrypoint-initdb.d/
