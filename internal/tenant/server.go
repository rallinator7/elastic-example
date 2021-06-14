package tenant

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/elastic/go-elasticsearch/esapi"
	"github.com/elastic/go-elasticsearch/v7"
	"github.com/google/uuid"
)

type Server struct {
	ElasticClient *elasticsearch.Client
	Index         string
	UnimplementedTenantServiceServer
}

func NewServer(ec *elasticsearch.Client, index string) *Server {
	s := Server{
		ElasticClient: ec,
		Index:         index,
	}
	return &s
}

func (s *Server) Create(ctx context.Context, req *CreateRequest) (*CreateResponse, error) {
	id := uuid.New()
	tenant := Tenant{
		Id:   id.String(),
		Name: req.Name,
	}

	var b strings.Builder
	b.WriteString(`{"type" : "tenant",`)
	b.WriteString(`"tenant_id" : "` + tenant.Id + `",`)
	b.WriteString(`"tenant_name" : "` + tenant.Name + `",`)
	b.WriteString(`"relation" : "tenant"}`)

	elasticReq := esapi.IndexRequest{
		Index:      s.Index,
		DocumentID: tenant.Id,
		Body:       strings.NewReader(b.String()),
		Refresh:    "true",
	}

	res, err := elasticReq.Do(context.Background(), s.ElasticClient)
	if err != nil {
		return nil, fmt.Errorf("could not add tenant to index: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		return nil, fmt.Errorf("error indexing tenant: %s", res.Status())
	}

	return &CreateResponse{
		Tenant: &tenant,
	}, nil
}

func (s *Server) GetAll(ctx context.Context, req *GetAllRequest) (*GetAllResponse, error) {
	var buf bytes.Buffer
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"match": map[string]interface{}{
				"type": "tenant",
			},
		},
	}

	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		return nil, fmt.Errorf("Error encoding query: %s", err)
	}

	res, err := s.ElasticClient.Search(
		s.ElasticClient.Search.WithContext(context.Background()),
		s.ElasticClient.Search.WithIndex(s.Index),
		s.ElasticClient.Search.WithBody(&buf),
		s.ElasticClient.Search.WithTrackTotalHits(true),
		s.ElasticClient.Search.WithPretty(),
	)
	if err != nil {
		return nil, fmt.Errorf("Error getting response: %s", err)
	}

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			return nil, fmt.Errorf("Error parsing the response body: %s", err)
		} else {
			return nil, fmt.Errorf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		return nil, fmt.Errorf("Error parsing the response body: %s", err)
	}

	tenantList := []*Tenant{}

	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		tenantJson := hit.(map[string]interface{})["_source"].(map[string]interface{})

		tenant := Tenant{
			Id:   tenantJson["tenant_id"].(string),
			Name: tenantJson["tenant_name"].(string),
		}

		tenantList = append(tenantList, &tenant)
	}

	defer res.Body.Close()

	return &GetAllResponse{
		Tenants: tenantList,
	}, nil
}
