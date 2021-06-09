resource "elasticsearch_index" "elastic_example" {
  name = "elastic-example"
  number_of_shards = 3
  number_of_replicas = 3
  mappings = <<EOF
{
"properties": {
    "type": {
    "type": "keyword"
    },
    "tenant_id": {
    "type": "keyword"
    },
    "tenant_name": {
    "type": "keyword"
    },
    "client_id": {
    "type": "keyword"
    },
    "client_name": {
    "type": "search_as_you_type"
    },
    "client_phone_number": {
    "type": "keyword"
    },
    "client_address": {
    "type": "keyword"
    },
    "message_id": {
    "type": "keyword"
    },
    "message_type": {
    "type": "keyword"
    },
    "message_fields": {
    "type": "nested",
    "properties": {
        "key": {
            "type": "keyword"
        },
        "value": {
            "type": "text"
        }
    }
    },
    "relation": { 
    "type": "join",
    "relations": {
        "tenant" : "client",
        "client" : "message"
    }
    }
}

}
EOF
}