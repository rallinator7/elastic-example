package main

import (
	"log"
	"os"
	"time"

	"golang.org/x/net/context"
	"google.golang.org/grpc"

	"github.com/rallinator7/protoc-example/chat"
)

func main() {
	ev := map[string]string{
		"SERVER_PORT": "",
		"SERVER_HOST": "",
	}
	for k := range ev {
		ev[k] = os.Getenv(k)
		if ev[k] == "" {
			log.Fatalf("environment variable %s is not set. Must be set in order to run", k)
		}
	}

	var conn *grpc.ClientConn

	conn, err := grpc.Dial(ev["SERVER_HOST"]+":"+ev["SERVER_PORT"], grpc.WithInsecure())
	if err != nil {
		log.Fatalf("could not connect: %s", err)
	}
	defer conn.Close()

	c := chat.NewChatServiceClient(conn)

	message := chat.Message{
		Body: "Hello from the Client!",
	}

	for {
		response, err := c.SayHello(context.Background(), &message)
		if err != nil {
			log.Fatalf("error when saying hello: %s", err)
		}

		log.Printf("response from server: %s", response.Body)

		time.Sleep(time.Second * 3)
	}
}
