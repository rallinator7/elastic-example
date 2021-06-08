package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/rallinator7/elastic-example/internal/common/elastic"
	"github.com/rallinator7/elastic-example/internal/tenant"
	"google.golang.org/grpc"
)

func main() {
	ev := map[string]string{
		"PORT":         "",
		"ELASTIC_CONN": "",
	}
	for k := range ev {
		ev[k] = os.Getenv(k)
		if ev[k] == "" {
			log.Fatalf("environment variable %s is not set. Must be set in order to run", k)
		}
	}

	lis, err := net.Listen("tcp", ":"+ev["PORT"])
	if err != nil {
		log.Fatalf("could not listen on port %s: %s", ev["PORT"], err)
	}

	es, err := elastic.NewClient(ev["ELASTIC_CONN"])

	tenantServer := tenant.NewServer(es)
	// messageServer := message.NewServer(es)
	// clientServer := client.NewServer(es)

	grpcServer := grpc.NewServer()

	tenant.RegisterTenantServiceServer(grpcServer, tenantServer)
	// message.RegisterClientServiceServer(grpcServer, messageServer)
	// client.RegisterClientServiceServer(grpcServer, clientServer)

	err = grpcServer.Serve(lis)
	if err != nil {
		log.Fatalf("could to server grpc over port 9000: %v", err)
	}

	fmt.Printf("Now serving on port %s", ev["PORT"])

}
