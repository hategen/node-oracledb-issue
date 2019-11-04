FROM node:10.16.3

ENV LD_LIBRARY_PATH=/opt/oracle/instantclient

COPY ./dependencies/instantclient /opt/oracle/instantclient

RUN set -ex; \
    packages=' \
    vim \
    libjemalloc1 \
    libaio1 \
    libaio-dev \
    less '; \
    apt-get update; \
    apt-get install -y -t stretch --no-install-recommends $packages; \
    ln -s /opt/oracle/instantclient/libclntsh.so.12.1 /opt/oracle/instantclient/libclntsh.so;

EXPOSE 80 3000 3003 7777 7778 8888
