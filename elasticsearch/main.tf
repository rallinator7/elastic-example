terraform {
  required_providers {
    elasticsearch = {
      source = "phillbaker/elasticsearch"
      version = "1.5.7"
    }
  }
}

provider "elasticsearch" {
   url = "http://127.0.0.1:9200"
}