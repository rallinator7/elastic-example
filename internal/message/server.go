package message

import (
	"bytes"
	context "context"
	"encoding/json"
	"fmt"
	"github.com/elastic/go-elasticsearch/esapi"
	"github.com/google/uuid"
	"strings"

	"github.com/elastic/go-elasticsearch/v7"
)

type Server struct {
	ElasticClient *elasticsearch.Client
	Index         string
	UnimplementedMessageServiceServer
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
	message := Message{
		Id: id.String(),
		Type: req.Type,
		Fields: req.Fields,
	}

	var fieldsJson []byte

	fieldsJson, err := json.Marshal(message.Fields)
	if err != nil {
		return nil, fmt.Errorf("could marshal fields into json: %s", err)
	}

	stringFields := strings.Replace(string(fieldsJson), "Key", "key", -1)
	stringFields = strings.Replace(stringFields, "Value", "value", -1)

	var b strings.Builder
	b.WriteString(`{"type" : "message",`)
	b.WriteString(`"message_id" : "` + id.String() + `",`)
	b.WriteString(`"message_type" : "` + message.Type + `",`)
	b.WriteString(`"message_fields" : ` + stringFields + `,`)
	b.WriteString(`"relation" : {"name" : "message", "parent" : "` + req.ClientId + `"}}`)

	elasticReq := esapi.IndexRequest{
		Index:      s.Index,
		DocumentID: message.Id,
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

	return &CreateResponse{
		Message: &message,
	}, nil
}

func (s *Server) GetAll(ctx context.Context, req *GetAllRequest) (*GetAllResponse, error) {
	var buf bytes.Buffer
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"parent_id": map[string]interface{}{
				"type": "message",
				"id": req.ClientId,
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
			return nil, fmt.Errorf("error parsing the response body: %s", err)
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
		return nil, fmt.Errorf("error parsing the response body: %s", err)
	}

	var messageList []*Message

	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		messageJson := hit.(map[string]interface{})["_source"].(map[string]interface{})

		mf := messageJson["message_fields"].([]interface{})

		var fields []*Field
		for _, f := range mf {
			newField := Field{
				Key:   f.(map[string]interface{})["Key"].(string),
				Value: f.(map[string]interface{})["Value"].(string),
			}

			fields = append(fields, &newField)
		}

		message := Message{
			Id:     messageJson["message_id"].(string),
			Type:   messageJson["message_type"].(string),
			Fields: fields,
		}

		messageList = append(messageList, &message)
	}

	return &GetAllResponse{
		Messages: messageList,
	}, nil
}

func (s *Server) GetAllOfType(ctx context.Context, req *GetAllOfTypeRequest) (*GetAllOfTypeResponse, error) {
	var buf bytes.Buffer

	query := map[string]interface{}{
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must":[]map[string]interface{}{
					{"parent_id": map[string]interface{}{
						"type": "message",
						"id":   req.ClientId,
					}},
					{"match": map[string]interface{}{
						"message_type": req.Type,
					}},
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
			return nil, fmt.Errorf("error parsing the response body: %s", err)
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
		return nil, fmt.Errorf("error parsing the response body: %s", err)
	}

	var messageList []*Message

	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		messageJson := hit.(map[string]interface{})["_source"].(map[string]interface{})

		mf := messageJson["message_fields"].([]interface{})

		var fields []*Field
		for _, f := range mf {
			newField := Field{
				Key:   f.(map[string]interface{})["Key"].(string),
				Value: f.(map[string]interface{})["Value"].(string),
			}

			fields = append(fields, &newField)
		}

		message := Message{
			Id:     messageJson["message_id"].(string),
			Type:   messageJson["message_type"].(string),
			Fields: fields,
		}

		messageList = append(messageList, &message)
	}

	return &GetAllOfTypeResponse{
		Messages: messageList,
	}, nil
}

func (s *Server) SearchClientMessages(ctx context.Context, req *SearchClientMessagesRequest) (*SearchClientMessagesResponse, error) {
	return nil, nil
}

func (s *Server) GetMessageTypes(ctx context.Context, req *GetMessageTypesRequest) (*GetMessageTypesResponse, error) {
	types := []string {
		"scheduling",
		"appointment",
		"cancellation",
		"insurance",
	}

	return &GetMessageTypesResponse{
		Types: types,
	}, nil
}

