FROM hayd/deno:latest
EXPOSE 8000
WORKDIR /app
ADD . /app
RUN deno cache server.ts

CMD ["run", "--allow-net", "server.ts"]
