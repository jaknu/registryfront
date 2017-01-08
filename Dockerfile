FROM nginx

COPY . /registryfront

CMD ["sh", "/registryfront/run.sh"]
