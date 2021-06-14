package client

import (
	"bytes"
	context "context"
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
	id := uuid.New()
	client := Client{
		Id:          id.String(),
		Name:        req.Name,
		PhoneNumber: req.PhoneNumber,
		Address:     req.Address,
	}

	var b strings.Builder
	b.WriteString(`{"type" : "client",`)
	b.WriteString(`"client_id" : "` + id.String() + `",`)
	b.WriteString(`"client_name" : "` + client.Name + `",`)
	b.WriteString(`"client_phone_number" : "` + client.PhoneNumber + `",`)
	b.WriteString(`"client_address" : "` + client.Address + `",`)
	b.WriteString(`"relation" : {"name" : "client", "parent" : "` + req.TenantId + `"}}`)

	elasticReq := esapi.IndexRequest{
		Index:      s.Index,
		DocumentID: client.Id,
		Routing:    req.TenantId,
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
	return nil, nil
}

func (s *Server) Get(ctx context.Context, req *GetRequest) (*GetResponse, error) {
	var buf bytes.Buffer
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"match": map[string]interface{}{
				"client_id": req.Id,
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

	var client Client

	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		clientJson := hit.(map[string]interface{})["_source"].(map[string]interface{})

		client = Client{
			Name:        clientJson["client_name"].(string),
			PhoneNumber: clientJson["client_phone_number"].(string),
			Address:     clientJson["client_address"].(string),
			Id:          clientJson["client_id"].(string),
		}
	}

	return &GetResponse{
		Client: &client,
	}, nil
}

func (s *Server) NameSearch(ctx context.Context, req *NameSearchRequest) (*NameSearchResponse, error) {
	var buf bytes.Buffer
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must": map[string]interface{}{
					"parent_id": map[string]interface{}{
						"type": "client",
						"id":   req.TenantId,
					},
				},
				"should": map[string]interface{}{
					"multi_match": map[string]interface{}{
						"query": req.Name,
						"type":  "bool_prefix",
						"fields": []string{
							"client_name",
							"client_name._2gram",
							"client_name._3gram",
						},
					},
				},
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

	nsrList := []*NameSearchResult{}

	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		clientJson := hit.(map[string]interface{})["_source"].(map[string]interface{})

		nsr := NameSearchResult{
			Id:   clientJson["client_id"].(string),
			Name: clientJson["client_name"].(string),
		}

		nsrList = append(nsrList, &nsr)
	}

	return &NameSearchResponse{
		Clients: nsrList,
	}, nil
}
