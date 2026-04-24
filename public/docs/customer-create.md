# Create Customer

> **Stability:** stable · **Since:** 0.1.0 · **Category:** Customer

`POST /api/v1/customer`

Registers a new customer with billing/shipping addresses, contact details, and optional merchant metadata. Returns the created customer object with a system-generated `customer_id`.

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `first_name` | `string` | ✅ | Customer's first name. |
| `last_name` | `string` | ✅ | Customer's last name. |
| `email_id` | `string` | ✅ | Customer's email address. |
| `mobile_number` | `string` | ✅ | Customer's mobile number (without country code). |
| `country_code` | `string` | — | Country dialling code. Defaults to `91`. |
| `billing_address` | `Address` | — | Customer's billing address object. |
| `shipping_address` | `Address` | — | Customer's shipping address object. |
| `merchant_metadata` | `object` | — | Arbitrary key-value pairs for merchant-specific data. |

## Code Examples

### Ruby

```ruby
require 'uri'
require 'net/http'
require 'json'

url = URI("https://pluraluat.v2.pinepg.in/api/v1/customer")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["accept"] = 'application/json'
request["content-type"] = 'application/json'
request.body = {
  first_name: "Kevin",
  last_name: "Bob",
  email_id: "kevin.bob@example.com",
  country_code: "91",
  mobile_number: "9876543210"
}.to_json

response = http.request(request)
puts response.read_body
```

### Python

```python
import requests

url = "https://pluraluat.v2.pinepg.in/api/v1/customer"

payload = {
    "first_name": "Kevin",
    "last_name": "Bob",
    "email_id": "kevin.bob@example.com",
    "country_code": "91",
    "mobile_number": "9876543210"
}
headers = {
    "accept": "application/json",
    "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

### Node.js

```javascript
const axios = require('axios');

const url = 'https://pluraluat.v2.pinepg.in/api/v1/customer';

const payload = {
  first_name: 'Kevin',
  last_name: 'Bob',
  email_id: 'kevin.bob@example.com',
  country_code: '91',
  mobile_number: '9876543210'
};

const { data } = await axios.post(url, payload, {
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json'
  }
});
console.log(data);
```

### Java

```java
HttpClient client = HttpClient.newHttpClient();

String body = """
  {
    "first_name": "Kevin",
    "last_name": "Bob",
    "email_id": "kevin.bob@example.com",
    "country_code": "91",
    "mobile_number": "9876543210"
  }
  """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://pluraluat.v2.pinepg.in/api/v1/customer"))
    .header("accept", "application/json")
    .header("content-type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

### cURL

```bash
curl -X POST https://pluraluat.v2.pinepg.in/api/v1/customer \
  -H 'accept: application/json' \
  -H 'content-type: application/json' \
  -d '{
    "first_name": "Kevin",
    "last_name": "Bob",
    "email_id": "kevin.bob@example.com",
    "country_code": "91",
    "mobile_number": "9876543210"
  }'
```

### C#

```csharp
using var client = new HttpClient();

var payload = new StringContent(
    @"{
        ""first_name"": ""Kevin"",
        ""last_name"": ""Bob"",
        ""email_id"": ""kevin.bob@example.com"",
        ""country_code"": ""91"",
        ""mobile_number"": ""9876543210""
    }",
    Encoding.UTF8,
    "application/json");

var response = await client.PostAsync(
    "https://pluraluat.v2.pinepg.in/api/v1/customer",
    payload);

Console.WriteLine(await response.Content.ReadAsStringAsync());
```

### PHP

```php
$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://pluraluat.v2.pinepg.in/api/v1/customer',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'accept: application/json',
        'content-type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'first_name' => 'Kevin',
        'last_name' => 'Bob',
        'email_id' => 'kevin.bob@example.com',
        'country_code' => '91',
        'mobile_number' => '9876543210'
    ])
]);

$response = curl_exec($ch);
curl_close($ch);
echo $response;
```

### Go

```go
package main

import (
    "bytes"
    "fmt"
    "io"
    "net/http"
)

func main() {
    body := []byte(`{
        "first_name": "Kevin",
        "last_name": "Bob",
        "email_id": "kevin.bob@example.com",
        "country_code": "91",
        "mobile_number": "9876543210"
    }`)

    req, _ := http.NewRequest("POST",
        "https://pluraluat.v2.pinepg.in/api/v1/customer",
        bytes.NewBuffer(body))
    req.Header.Set("accept", "application/json")
    req.Header.Set("content-type", "application/json")

    resp, _ := http.DefaultClient.Do(req)
    defer resp.Body.Close()
    resBody, _ := io.ReadAll(resp.Body)
    fmt.Println(string(resBody))
}
```

## Response

```json
{
  "customer_id": "cust-v1-0811030624-aa-RBDgpR",
  "merchant_customer_reference": "",
  "first_name": "Kevin",
  "last_name": "Bob",
  "country_code": "91",
  "mobile_number": "9876543210",
  "email_id": "kevin.bob@example.com",
  "billing_address": {
    "address1": "10 Downing Street Westminster London",
    "address2": "Oxford Street Westminster London",
    "address3": "Baker Street Westminster London",
    "pincode": "51524036",
    "city": "Westminster",
    "state": "Westminster",
    "country": "London",
    "full_name": "Kevin Bob",
    "adddress_type": "Home",
    "address_category": "billing"
  },
  "shipping_address": {
    "address1": "10 Downing Street Westminster London",
    "address2": "Oxford Street Westminster London",
    "address3": "Baker Street Westminster London",
    "pincode": "51524036",
    "city": "Westminster",
    "state": "Westminster",
    "country": "London",
    "full_name": "Kevin Bob",
    "adddress_type": "Home",
    "address_category": "shipping"
  },
  "gstin": "",
  "merchant_metadata": {
    "key1": "XX",
    "key2": "DOF"
  },
  "status": "INACTIVE",
  "created_at": "2024-10-04T13:11:29.645591Z",
  "updated_at": "2024-10-04T13:11:29.645657Z"
}
```

## Errors

| Variant | Description | Recoverable |
|---------|-------------|-------------|
| `INVALID_EMAIL` | email_id is not a valid email format. | ✕ |
| `MISSING_FIELD` | A required field is missing. | ✕ |
| `DUPLICATE_CUSTOMER` | A customer with the same mobile_number or email_id already exists. | ✕ |
| `SERVER_ERROR` | Upstream server returned an unexpected error. | ↻ |
| `TIMEOUT` | Request timed out. | ↻ |

## See Also

- [init](/pinelabs-docs/api/init)
