# elastic-example
example app for using elasticsearch as backend database

## Prereqs

- [protoc cli](https://github.com/protocolbuffers/protobuf) 
- [protoc go plugin](https://grpc.io/docs/languages/go/quickstart/)
- [grpc web plugin](https://github.com/grpc/grpc-web)
- [docker](https://docs.docker.com/get-docker/)
- [terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)


## Setup

### Elasticsearch

Elasticsearch requires more virtual memory than what the usual default is.  You will need to set it by running:

    sudo sysctl -w vm.max_map_count=262144

Once we have this setup, we will need to create the elasticsearch index for our backend.

    docker-compose up
    cd ./elasticsearch
    terraform init
    terraform apply
    docker-compose down

