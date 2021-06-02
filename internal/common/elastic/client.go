package elastic

import (
	"errors"
	"fmt"
	"strings"

	"github.com/elastic/go-elasticsearch/v7"
)

func NewClient(connection string) (*elasticsearch.Client, error) {

	endpoints := strings.Split(connection, ",")

	if len(endpoints) < 1 {
		return nil, errors.New("could not create elasticsearch client - must provide , seperated list of endpoints")
	}

	cfg := elasticsearch.Config{
		Addresses: endpoints,
	}

	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		return nil, fmt.Errorf("could not create elastic client: %s", err)
	}

	return es, nil
}
