// +build mage

package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/elastic/go-elasticsearch/esapi"
	"github.com/elastic/go-elasticsearch/v7"
	"github.com/google/uuid"
	"github.com/magefile/mage/sh"
)

var (
	env = map[string]string{
		"CGO_ENABLED": "0",
	}
)

func CreateProto() error {

	fpPath := filepath.Join("frontend", "src", "app", "proto")
	if _, err := os.Stat(fpPath); os.IsNotExist(err) {
		err := os.Mkdir(fpPath, 0775)
		if err != nil {
			return fmt.Errorf("could not create frontend proto path: %s", err)
		}
	}

	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "proto")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	files, err := ioutil.ReadDir("./")
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		extension := filepath.Ext(file.Name())
		if extension == ".proto" {
			err = sh.Run("protoc", "--go_out=plugins=grpc:.", file.Name())
			if err != nil {
				return fmt.Errorf("error building go proto for %s: %s", file.Name(), err)
			}

			err = sh.Run("protoc", "--js_out=import_style=commonjs:./../frontend/src/app/proto", "--grpc-web_out=import_style=typescript,mode=grpcwebtext:./../frontend/src/app/proto", file.Name())
			if err != nil {
				return fmt.Errorf("error building go proto for %s: %s", file.Name(), err)
			}
		}
	}

	err = os.Chdir(cd)
	if err != nil {
		return fmt.Errorf("could not change directories: %s", err)
	}

	return nil
}

func getElasticClient() (*elasticsearch.Client, error) {
	cfg := elasticsearch.Config{
		Addresses: []string{"http://localhost:9200"},
	}

	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		return nil, fmt.Errorf("could not create elastic client: %s", err)
	}

	return es, nil
}

func CreateTenant() error {

	es, err := getElasticClient()

	id := uuid.New()
	var b strings.Builder
	b.WriteString(`{"type" : "tenant",`)
	b.WriteString(`"tenant_id" : "` + id.String() + `",`)
	b.WriteString(`"tenant_name" : "` + "test" + `",`)
	b.WriteString(`"relation" : "tenant"}`)

	req := esapi.IndexRequest{
		Index:      "elastic-example",
		DocumentID: id.String(),
		Body:       strings.NewReader(b.String()),
		Refresh:    "true",
	}

	// Perform the request with the client.
	res, err := req.Do(context.Background(), es)
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		return fmt.Errorf("error %s", "error")
	} else {
		// Deserialize the response into a map.
		var r map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
			log.Printf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and indexed document version.
			fmt.Printf("[%s] %s; version=%d", res.Status(), r["result"], int(r["_version"].(float64)))
		}
	}

	// id := uuid.New()

	// var b strings.Builder
	// b.WriteString(`{"type" : "tenant",`)
	// b.WriteString(`{"tenant_id" : "` + id.String() + `",`)
	// b.WriteString(`{"tenant_name" : "` + "test" + `",`)
	// b.WriteString(`{"relation" : "tenant"`)
	// b.WriteString(`"}`)

	// fmt.Print(strings.NewReader(b.String()))

	// elasticReq := esapi.IndexRequest{
	// 	Index:      "elastic-example",
	// 	DocumentID: id.String(),
	// 	Body:       strings.NewReader(b.String()),
	// 	Refresh:    "true",
	// }

	// res, err := elasticReq.Do(context.Background(), es)
	// if err != nil {
	// 	return fmt.Errorf("could not add tenant to index: %s", err)
	// }
	// defer res.Body.Close()

	// if res.IsError() {
	// 	var bytes []byte
	// 	_, err := res.Body.Read(bytes)
	// 	if err != nil {
	// 		return fmt.Errorf("oops: %s", err)
	// 	}
	// 	return fmt.Errorf("error indexing tenant: %s", string(bytes))
	// }

	return nil
}

func GetTenants() error {
	cfg := elasticsearch.Config{
		Addresses: []string{"http://localhost:9200"},
	}

	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		return fmt.Errorf("could not create elastic client: %s", err)
	}

	var buf bytes.Buffer
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"match": map[string]interface{}{
				"type": "tenant",
			},
		},
	}
	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		return fmt.Errorf("Error encoding query: %s", err)
	}

	res, err := es.Search(
		es.Search.WithContext(context.Background()),
		es.Search.WithIndex("elastic-example"),
		es.Search.WithBody(&buf),
		es.Search.WithTrackTotalHits(true),
		es.Search.WithPretty(),
	)
	if err != nil {
		return fmt.Errorf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			return fmt.Errorf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			return fmt.Errorf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		return fmt.Errorf("Error parsing the response body: %s", err)
	}

	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		tenantJson := hit.(map[string]interface{})["_source"].(map[string]interface{})

		t := ElasticTenant{
			Id:   tenantJson["tenant_id"].(string),
			Name: tenantJson["tenant_name"].(string),
		}

		fmt.Println(t)

	}

	return nil
}

type ElasticTenant struct {
	Id   string
	Name string
}

func BuildClient() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "frontend")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "elastic-client", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	return nil
}

func BuildEnvoy() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "envoy")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "elastic-envoy", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	return nil
}

func BuildServer() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "server")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.RunWith(env, "go", "build")
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "elastic-server", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	err = os.Chdir(cd)
	if err != nil {
		return fmt.Errorf("could not change directories: %s", err)
	}

	return nil
}
