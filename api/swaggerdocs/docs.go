// Package swaggerdocs Code generated by swaggo/swag. DO NOT EDIT
package swaggerdocs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://localhost:3000/terms",
        "contact": {
            "name": "Mert Turkmenoglu",
            "url": "https://mertturkmenoglu.com",
            "email": "gethorizonapp@gmail.com"
        },
        "license": {
            "name": "MIT",
            "url": "https://mit-license.org/"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/aggregations/home": {
            "get": {
                "description": "An endpoint to fetch multiple homepage queries",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Aggregations"
                ],
                "summary": "Fetch multiple homepage entities in a single request",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "schema": {
                            "$ref": "#/definitions/aggregations.GetHomeAggregationsResponseDto"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {}
                    }
                }
            }
        },
        "/auth/credentials/login": {
            "post": {
                "description": "Logs in the user with email and password",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Login with email and password",
                "parameters": [
                    {
                        "description": "Request body",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/auth.LoginRequestDto"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Invalid email or password",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/credentials/register": {
            "post": {
                "description": "Registers a new user with email and password",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Register with email and password",
                "parameters": [
                    {
                        "description": "Request body",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/auth.RegisterRequestDto"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created"
                    },
                    "400": {
                        "description": "Invalid email or username",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/forgot-password/reset": {
            "post": {
                "description": "Resets the password of the user",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Reset password",
                "parameters": [
                    {
                        "description": "Request body",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/auth.ResetPasswordRequestDto"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Invalid email or code",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "404": {
                        "description": "User not found",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/forgot-password/send": {
            "post": {
                "description": "Sends a forgot password email to the user",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Send forgot password email",
                "parameters": [
                    {
                        "description": "Request body",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/auth.SendForgotPasswordEmailRequestDto"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Invalid email",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "404": {
                        "description": "User not found",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/google": {
            "get": {
                "description": "Login with Google OAuth2",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Login with Google OAuth2",
                "responses": {
                    "307": {
                        "description": "Temporary Redirect"
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/google/callback": {
            "get": {
                "description": "Google OAuth2 callback",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Google OAuth2 callback",
                "responses": {
                    "307": {
                        "description": "Temporary Redirect"
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/logout": {
            "post": {
                "description": "Logs out the current user",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Logs out the current user",
                "responses": {
                    "204": {
                        "description": "No Content"
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/me": {
            "get": {
                "description": "Gets the currently authenticated user or returns an error",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Gets the current user",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/auth.GetMeResponseDto"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/verify-email/send": {
            "post": {
                "description": "Sends a verification email to the user",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Send verification email",
                "parameters": [
                    {
                        "description": "Request body",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/auth.SendVerificationEmailRequestDto"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Invalid email or email already verified",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/auth/verify-email/verify": {
            "get": {
                "description": "Verifies the email of the user",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Verify email",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Verification code",
                        "name": "code",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Invalid or expired verification code",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/echo.HTTPError"
                        }
                    }
                }
            }
        },
        "/health/": {
            "get": {
                "description": "An endpoint to be used by load balancers to check the health of the service.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "health"
                ],
                "summary": "Returns ok message",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/health.GetHealthResponseDto"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "aggregations.GetHomeAggregationsResponseDto": {
            "description": "Response for home aggregations",
            "type": "object",
            "properties": {
                "favorites": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/aggregations.HServiceResponseDto"
                    }
                },
                "featured": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/aggregations.HServiceResponseDto"
                    }
                },
                "new": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/aggregations.HServiceResponseDto"
                    }
                },
                "popular": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/aggregations.HServiceResponseDto"
                    }
                }
            }
        },
        "aggregations.HServiceResponseDto": {
            "description": "Basic service information with user information",
            "type": "object",
            "properties": {
                "category": {
                    "type": "integer",
                    "example": 1
                },
                "createdAt": {
                    "type": "string",
                    "example": "2024-08-26T10:24:13.508676+03:00"
                },
                "deliveryTime": {
                    "type": "integer",
                    "example": 1
                },
                "deliveryTimespan": {
                    "type": "string",
                    "example": "HOURLY"
                },
                "description": {
                    "type": "string",
                    "example": "Example service description"
                },
                "id": {
                    "type": "string",
                    "example": "7234882566245847040"
                },
                "isOnline": {
                    "type": "boolean",
                    "example": true
                },
                "location": {
                    "type": "string",
                    "example": "Example Location"
                },
                "media": {
                    "type": "object",
                    "additionalProperties": {}
                },
                "price": {
                    "type": "number",
                    "example": 10
                },
                "priceTimespan": {
                    "type": "string",
                    "example": "HOURLY"
                },
                "priceUnit": {
                    "type": "string",
                    "example": "USD"
                },
                "slug": {
                    "type": "string",
                    "example": "example-service"
                },
                "title": {
                    "type": "string",
                    "example": "Example Service"
                },
                "totalPoints": {
                    "type": "integer",
                    "example": 50
                },
                "totalVotes": {
                    "type": "integer",
                    "example": 10
                },
                "updatedAt": {
                    "type": "string",
                    "example": "2024-08-26T10:24:13.508676+03:00"
                },
                "url": {
                    "type": "string",
                    "example": "https://example.com"
                },
                "user": {
                    "$ref": "#/definitions/aggregations.UserResponseDto"
                },
                "userId": {
                    "type": "string",
                    "example": "528696135489945615"
                }
            }
        },
        "aggregations.UserResponseDto": {
            "description": "Basic user information",
            "type": "object",
            "properties": {
                "createdAt": {
                    "type": "string",
                    "example": "2024-08-26T10:24:13.508676+03:00"
                },
                "fullName": {
                    "type": "string",
                    "example": "John Doe"
                },
                "gender": {
                    "type": "string",
                    "example": "male"
                },
                "id": {
                    "type": "string",
                    "example": "528696135489945615"
                },
                "profileImage": {
                    "type": "string",
                    "example": "https://example.com/image.jpg"
                },
                "username": {
                    "type": "string",
                    "example": "johndoe"
                }
            }
        },
        "auth.GetMeResponseDto": {
            "type": "object",
            "properties": {
                "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-08-26T10:24:13.508676+03:00"
                },
                "email": {
                    "type": "string",
                    "example": "johndoe@example.com"
                },
                "fullName": {
                    "type": "string",
                    "example": "John Doe"
                },
                "gender": {
                    "type": "string",
                    "example": "male"
                },
                "googleId": {
                    "type": "string",
                    "example": "10887502189381205719451"
                },
                "id": {
                    "type": "string",
                    "example": "528696135489945615"
                },
                "isActive": {
                    "type": "boolean",
                    "example": true
                },
                "isEmailVerified": {
                    "type": "boolean",
                    "example": true
                },
                "lastLogin": {
                    "type": "string",
                    "example": "2024-08-26T10:24:13.508676+03:00"
                },
                "profileImage": {
                    "type": "string",
                    "example": "https://example.com/image.jpg"
                },
                "role": {
                    "type": "string",
                    "example": "user"
                },
                "updatedAt": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-08-26T10:24:13.508676+03:00"
                },
                "username": {
                    "type": "string",
                    "example": "johndoe"
                }
            }
        },
        "auth.LoginRequestDto": {
            "description": "Login request dto",
            "type": "object",
            "required": [
                "email",
                "password"
            ],
            "properties": {
                "email": {
                    "type": "string",
                    "example": "johndoe@example.com"
                },
                "password": {
                    "type": "string",
                    "format": "password",
                    "maxLength": 128,
                    "minLength": 6,
                    "example": "password123"
                }
            }
        },
        "auth.RegisterRequestDto": {
            "type": "object",
            "required": [
                "email",
                "fullName",
                "password",
                "username"
            ],
            "properties": {
                "email": {
                    "type": "string",
                    "maxLength": 128,
                    "minLength": 3,
                    "example": "johndoe@example.com"
                },
                "fullName": {
                    "type": "string",
                    "maxLength": 128,
                    "minLength": 3,
                    "example": "John Doe"
                },
                "password": {
                    "type": "string",
                    "format": "password",
                    "maxLength": 128,
                    "minLength": 6,
                    "example": "password123"
                },
                "username": {
                    "type": "string",
                    "maxLength": 32,
                    "minLength": 4,
                    "example": "johndoe"
                }
            }
        },
        "auth.ResetPasswordRequestDto": {
            "type": "object",
            "required": [
                "code",
                "email",
                "newPassword"
            ],
            "properties": {
                "code": {
                    "type": "string",
                    "example": "123456"
                },
                "email": {
                    "type": "string",
                    "example": "johndoe@example.com"
                },
                "newPassword": {
                    "type": "string",
                    "format": "password",
                    "maxLength": 128,
                    "minLength": 6,
                    "example": "password123"
                }
            }
        },
        "auth.SendForgotPasswordEmailRequestDto": {
            "type": "object",
            "required": [
                "email"
            ],
            "properties": {
                "email": {
                    "type": "string",
                    "example": "johndoe@example.com"
                }
            }
        },
        "auth.SendVerificationEmailRequestDto": {
            "type": "object",
            "required": [
                "email"
            ],
            "properties": {
                "email": {
                    "type": "string",
                    "example": "johndoe@example.com"
                }
            }
        },
        "echo.HTTPError": {
            "type": "object",
            "properties": {
                "message": {}
            }
        },
        "health.GetHealthResponseDto": {
            "description": "Generic response dto",
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:5000",
	BasePath:         "/api",
	Schemes:          []string{},
	Title:            "Horizon API",
	Description:      "Horizon backend services",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
