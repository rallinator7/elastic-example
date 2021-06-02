FROM alpine:3.13.5

#add beeze user
RUN adduser -h /home/client -D -S client

# copy binary
COPY ./client /home/client

USER client

WORKDIR /home/client

ENTRYPOINT [ "./client" ]