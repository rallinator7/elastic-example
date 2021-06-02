package client

import (
	context "context"

	"github.com/elastic/go-elasticsearch/v7"
)

type Server struct {
	ElasticClient *elasticsearch.Client
}

func NewServer(ec *elasticsearch.Client) *Server {
	s := Server{
		ElasticClient: ec,
	}
	return &s
}

func (s *Server) Create(ctx context.Context, req *CreateRequest) (*CreateResponse, error) {

	return nil, nil
}

func (s *Server) Get(ctx context.Context, req *GetRequest) (*GetResponse, error) {
	return nil, nil
}

func (s *Server) NameSearch(ctx context.Context, req *NameSearchRequest) (*NameSearchResponse, error) {
	return nil, nil
}
