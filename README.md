# Backend

## Introfuction/Overview
MedCab allows new, or experienced, cannabis users to find a helping hand in the search for cannabis for medicinal use. This gives the user an alternative to pharmaceuticals.
MedCab helps patients find the right strain, dosing, intake method, and intake schedule. They patient can view the list of products and select a strain. The user can also give ratings and save favorites to any strain they have used.

## Authentication
Register and login forms produce a token that has to be held in the header to access all the other endpoints(private routes).

## Error Codes 
What errors and status codes can a user expect?

Error Response:

- Code: 404 NOT FOUND
**Content:** `{ error : "User doesn't exist" }`

- Code: 401 UNAUTHORIZED
**Content:** `{error: "Invalid credentials."}`

- Code: 400 BAD REQUEST
**Content:** `{message: "missing user data"}`
**Content:** `{message: "missing required email field"}`
**Content:** `{message: "missing required password field"}`

- Code: 400 BAD REQUEST - users posts router
**Content:** `({ message: "missing required fields" })`
**Content:** `({ message: "missing required title field" })`
**Content:** `({ message: "missing required body field" })`

## Register a User

**Information required to register a user:**
    >`POST` /api/auth/register \
    `Host`: https://medcab3-strain.herokuapp.com/

```
    {
        "email": "sample@email.com",
        "name": "user",
        "password": "any123"
    }
```

The users ID is generated automatically on the backend. The id and token will be returned in this form:
```
 {
        "id": 5,
        "email": "email3@email.com",
        "name": "myname",
        "password": "$2a$08$kMwQpLdJzY.PxuClx/g53OKSxXhNm1SF96YOMpbD/5J3mLXbbkuYq",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsM0BlbWFpbC5jb20iLCJpYXQiOjE1ODgwOTczOTEsImV4cCI6MTU4ODE4Mzc5MX0.jtjHXiqdfOgDSad0rx5JelLLfT_IgBFi1k_EFZr0i2c"
    }
```


## Log In a User

    >`POST` /api/auth/login \
    `Host`: https://medcab3-strain.herokuapp.com/

Log in with email/password used to register
```
{
        "email": "email3@email.com",
        "password": "please"
    }
```