package message

import (
	context "context"

	"github.com/elastic/go-elasticsearch/v7"
)

type Server struct {
	ElasticClient *elasticsearch.Client
	Index         string
	UnimplementedClientServiceServer
}

func NewServer(ec *elasticsearch.Client, index string) *Server {
	s := Server{
		ElasticClient: ec,
		Index:         index,
	}
	return &s
}

func (s *Server) Create(ctx context.Context, req *CreateRequest) (*CreateResponse, error) {

	return nil, nil
}

func (s *Server) GetAll(ctx context.Context, req *GetAllRequest) (*GetAllResponse, error) {
	return nil, nil
}

func (s *Server) GetAllOfType(ctx context.Context, req *GetAllOfTypeRequest) (*GetAllOfTypeResponse, error) {
	return nil, nil
}
