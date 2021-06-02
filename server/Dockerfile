FROM alpine:3.13.5

#add beeze user
RUN adduser -h /home/server -D -S server

# copy binary
COPY ./server /home/server

USER server

WORKDIR /home/server

ENTRYPOINT [ "./server" ]