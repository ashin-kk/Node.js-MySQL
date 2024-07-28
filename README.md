# Node.js - MySQL project

## Build with following stack

- Database: MySQL database
- Backend framework: NodeJs, Express, JavaScript

## Project Overview

### API

HTTP POST requests with JSON body

```
http://localhost:4000/contact/create
```

### Request payload

```
{
  "phone": string,
  "email": number
}
```

### Response payload

```
{
  "contact": {
    "primaryContatctId": number,
    "emails": string[], // first element being email of primary contact
    "phoneNumbers": string[], // first element being phoneNumber of primary contact
    "secondaryContactIds": number[] // Array of all Contact IDs that are "secondary"
  }
}
```

## Example

### Request payload

```
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```

### Response payload

```
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}
```

## Problem statements

- Request payload may contain both an email and a mobile number, or either one.
- create a new Contact row with linkPrecedence="primary" and treat it as a new customer, then return it with an empty array for secondaryContactIds
- When an incoming request has either a phoneNumber or an email that matches an existing contact but contains new information, the service will create a "secondary" contact.
- If more than one "primary" contact remains in the `contact` for the same request payload, the rule dictates that the oldest one will be the primary contact.
-
