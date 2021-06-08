package tenant

import (
	"context"

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

func (s *Server) GetAll(ctx context.Context, req *GetAllRequest) (*GetAllResponse, error) {
	t := []*Tenant{
		{Id: "1", Name: "Test Tenant1"},
		{Id: "2", Name: "Test Tenant2"},
		{Id: "3", Name: "Test Tenant3"},
	}
	return &GetAllResponse{
		Tenants: t,
	}, nil
}