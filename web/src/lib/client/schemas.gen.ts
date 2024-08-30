// This file is auto-generated by @hey-api/openapi-ts

export const $AggregationsHServiceResponseDto = {
    description: 'Basic service information with user information',
    type: 'object',
    required: ['category', 'createdAt', 'deliveryTime', 'deliveryTimespan', 'description', 'id', 'isOnline', 'location', 'media', 'price', 'priceTimespan', 'priceUnit', 'slug', 'title', 'totalPoints', 'totalVotes', 'updatedAt', 'user', 'userId'],
    properties: {
        category: {
            type: 'integer',
            example: 1
        },
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        deliveryTime: {
            type: 'integer',
            example: 1
        },
        deliveryTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        description: {
            type: 'string',
            example: 'Example service description'
        },
        id: {
            type: 'string',
            example: '7234882566245847040'
        },
        isOnline: {
            type: 'boolean',
            example: true
        },
        location: {
            type: 'string',
            example: 'Example Location'
        },
        media: {
            type: 'object',
            additionalProperties: {}
        },
        price: {
            type: 'number',
            example: 10
        },
        priceTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        priceUnit: {
            type: 'string',
            example: 'USD'
        },
        slug: {
            type: 'string',
            example: 'example-service'
        },
        title: {
            type: 'string',
            example: 'Example Service'
        },
        totalPoints: {
            type: 'integer',
            example: 50
        },
        totalVotes: {
            type: 'integer',
            example: 10
        },
        updatedAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        url: {
            type: 'string',
            example: 'https://example.com'
        },
        user: {
            '$ref': '#/definitions/AggregationsUserResponseDto'
        },
        userId: {
            type: 'string',
            example: '528696135489945615'
        }
    }
} as const;

export const $AggregationsUserResponseDto = {
    description: 'Basic user information',
    type: 'object',
    required: ['createdAt', 'fullName', 'id', 'username'],
    properties: {
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        fullName: {
            type: 'string',
            example: 'John Doe'
        },
        gender: {
            type: 'string',
            example: 'male'
        },
        id: {
            type: 'string',
            example: '528696135489945615'
        },
        profileImage: {
            type: 'string',
            example: 'https://example.com/image.jpg'
        },
        username: {
            type: 'string',
            example: 'johndoe'
        }
    }
} as const;

export const $AuthGetMeResponseDto = {
    type: 'object',
    required: ['createdAt', 'email', 'fullName', 'id', 'isActive', 'isEmailVerified', 'lastLogin', 'role', 'updatedAt', 'username'],
    properties: {
        createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        email: {
            type: 'string',
            example: 'johndoe@example.com'
        },
        fullName: {
            type: 'string',
            example: 'John Doe'
        },
        gender: {
            type: 'string',
            example: 'male'
        },
        googleId: {
            type: 'string',
            example: '10887502189381205719451'
        },
        id: {
            type: 'string',
            example: '528696135489945615'
        },
        isActive: {
            type: 'boolean',
            example: true
        },
        isEmailVerified: {
            type: 'boolean',
            example: true
        },
        lastLogin: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        profileImage: {
            type: 'string',
            example: 'https://example.com/image.jpg'
        },
        role: {
            type: 'string',
            example: 'user'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        username: {
            type: 'string',
            example: 'johndoe'
        }
    }
} as const;

export const $AuthLoginRequestDto = {
    description: 'Login request dto',
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            example: 'johndoe@example.com'
        },
        password: {
            type: 'string',
            format: 'password',
            maxLength: 128,
            minLength: 6,
            example: 'password123'
        }
    }
} as const;

export const $AuthRegisterRequestDto = {
    type: 'object',
    required: ['email', 'fullName', 'password', 'username'],
    properties: {
        email: {
            type: 'string',
            maxLength: 128,
            minLength: 3,
            example: 'johndoe@example.com'
        },
        fullName: {
            type: 'string',
            maxLength: 128,
            minLength: 3,
            example: 'John Doe'
        },
        password: {
            type: 'string',
            format: 'password',
            maxLength: 128,
            minLength: 6,
            example: 'password123'
        },
        username: {
            type: 'string',
            maxLength: 32,
            minLength: 4,
            example: 'johndoe'
        }
    }
} as const;

export const $AuthResetPasswordRequestDto = {
    type: 'object',
    required: ['code', 'email', 'newPassword'],
    properties: {
        code: {
            type: 'string',
            example: '123456'
        },
        email: {
            type: 'string',
            example: 'johndoe@example.com'
        },
        newPassword: {
            type: 'string',
            format: 'password',
            maxLength: 128,
            minLength: 6,
            example: 'password123'
        }
    }
} as const;

export const $AuthSendForgotPasswordEmailRequestDto = {
    type: 'object',
    required: ['email'],
    properties: {
        email: {
            type: 'string',
            example: 'johndoe@example.com'
        }
    }
} as const;

export const $AuthSendVerificationEmailRequestDto = {
    type: 'object',
    required: ['email'],
    properties: {
        email: {
            type: 'string',
            example: 'johndoe@example.com'
        }
    }
} as const;

export const $BookmarksBookmarksResponseDto = {
    description: 'Basic bookmark information',
    type: 'object',
    required: ['createdAt', 'hservice', 'hserviceId', 'id', 'userId'],
    properties: {
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        hservice: {
            '$ref': '#/definitions/BookmarksHServiceDto'
        },
        hserviceId: {
            type: 'string',
            example: '7235190573525635072'
        },
        id: {
            type: 'string',
            example: '7235190573525635072'
        },
        userId: {
            type: 'string',
            example: '528696135489945615'
        }
    }
} as const;

export const $BookmarksCreateBookmarkRequestDto = {
    description: 'CreateBookmarkRequestDto',
    type: 'object',
    required: ['hserviceId'],
    properties: {
        hserviceId: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
            example: '7235190573525635072'
        }
    }
} as const;

export const $BookmarksCreateBookmarkResponseDto = {
    description: 'CreateBookmarkResponseDto',
    type: 'object',
    required: ['id'],
    properties: {
        id: {
            type: 'string',
            example: '7235190573525635072'
        }
    }
} as const;

export const $BookmarksHServiceDto = {
    description: 'Basic service information without user information',
    type: 'object',
    required: ['category', 'createdAt', 'deliveryTime', 'deliveryTimespan', 'description', 'id', 'isOnline', 'location', 'media', 'price', 'priceTimespan', 'priceUnit', 'slug', 'title', 'totalPoints', 'totalVotes', 'updatedAt', 'userId'],
    properties: {
        category: {
            type: 'integer',
            example: 1
        },
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        deliveryTime: {
            type: 'integer',
            example: 1
        },
        deliveryTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        description: {
            type: 'string',
            example: 'Example service description'
        },
        id: {
            type: 'string',
            example: '7235190573525635072'
        },
        isOnline: {
            type: 'boolean',
            example: true
        },
        location: {
            type: 'string',
            example: 'Example Location'
        },
        media: {
            type: 'object',
            additionalProperties: {}
        },
        price: {
            type: 'number',
            example: 10
        },
        priceTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        priceUnit: {
            type: 'string',
            example: 'USD'
        },
        slug: {
            type: 'string',
            example: 'example-service'
        },
        title: {
            type: 'string',
            example: 'Example Service'
        },
        totalPoints: {
            type: 'integer',
            example: 50
        },
        totalVotes: {
            type: 'integer',
            example: 10
        },
        updatedAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        url: {
            type: 'string',
            example: 'https://example.com'
        },
        userId: {
            type: 'string',
            example: '528696135489945615'
        }
    }
} as const;

export const $FavoritesCreateFavoriteRequestDto = {
    description: 'CreateFavoriteRequestDto',
    type: 'object',
    required: ['hserviceId'],
    properties: {
        hserviceId: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
            example: '7235190573525635072'
        }
    }
} as const;

export const $FavoritesCreateFavoriteResponseDto = {
    description: 'CreateFavoriteResponseDto',
    type: 'object',
    required: ['id'],
    properties: {
        id: {
            type: 'string',
            example: '7235190573525635072'
        }
    }
} as const;

export const $FavoritesFavoritesResponseDto = {
    description: 'Basic favorite information',
    type: 'object',
    required: ['createdAt', 'hservice', 'hserviceId', 'id', 'userId'],
    properties: {
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        hservice: {
            '$ref': '#/definitions/FavoritesHServiceDto'
        },
        hserviceId: {
            type: 'string',
            example: '7235190573525635072'
        },
        id: {
            type: 'string',
            example: '7235190573525635072'
        },
        userId: {
            type: 'string',
            example: '528696135489945615'
        }
    }
} as const;

export const $FavoritesHServiceDto = {
    description: 'Basic service information without user information',
    type: 'object',
    required: ['category', 'createdAt', 'deliveryTime', 'deliveryTimespan', 'description', 'id', 'isOnline', 'location', 'media', 'price', 'priceTimespan', 'priceUnit', 'slug', 'title', 'totalPoints', 'totalVotes', 'updatedAt', 'userId'],
    properties: {
        category: {
            type: 'integer',
            example: 1
        },
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        deliveryTime: {
            type: 'integer',
            example: 1
        },
        deliveryTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        description: {
            type: 'string',
            example: 'Example service description'
        },
        id: {
            type: 'string',
            example: '7235190573525635072'
        },
        isOnline: {
            type: 'boolean',
            example: true
        },
        location: {
            type: 'string',
            example: 'Example Location'
        },
        media: {
            type: 'object',
            additionalProperties: {}
        },
        price: {
            type: 'number',
            example: 10
        },
        priceTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        priceUnit: {
            type: 'string',
            example: 'USD'
        },
        slug: {
            type: 'string',
            example: 'example-service'
        },
        title: {
            type: 'string',
            example: 'Example Service'
        },
        totalPoints: {
            type: 'integer',
            example: 50
        },
        totalVotes: {
            type: 'integer',
            example: 10
        },
        updatedAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        url: {
            type: 'string',
            example: 'https://example.com'
        },
        userId: {
            type: 'string',
            example: '528696135489945615'
        }
    }
} as const;

export const $GetHomeAggregationsResponseDto = {
    description: 'Response for home aggregations',
    type: 'object',
    required: ['favorites', 'featured', 'new', 'popular'],
    properties: {
        favorites: {
            type: 'array',
            items: {
                '$ref': '#/definitions/AggregationsHServiceResponseDto'
            }
        },
        featured: {
            type: 'array',
            items: {
                '$ref': '#/definitions/AggregationsHServiceResponseDto'
            }
        },
        new: {
            type: 'array',
            items: {
                '$ref': '#/definitions/AggregationsHServiceResponseDto'
            }
        },
        popular: {
            type: 'array',
            items: {
                '$ref': '#/definitions/AggregationsHServiceResponseDto'
            }
        }
    }
} as const;

export const $HMR = {
    type: 'object',
    required: ['data', 'metadata'],
    properties: {
        data: {},
        metadata: {}
    }
} as const;

export const $HPR = {
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
        data: {},
        pagination: {
            '$ref': '#/definitions/pagination.Pagination'
        }
    }
} as const;

export const $HR = {
    type: 'object',
    required: ['data'],
    properties: {
        data: {}
    }
} as const;

export const $HServicesCreateHServiceRequestDto = {
    description: 'CreateHServiceRequestDto',
    type: 'object',
    required: ['category', 'deliveryTime', 'deliveryTimespan', 'description', 'isOnline', 'location', 'media', 'price', 'priceTimespan', 'priceUnit', 'title'],
    properties: {
        category: {
            type: 'integer',
            maximum: 32,
            minimum: 1,
            example: 1
        },
        deliveryTime: {
            type: 'integer',
            maximum: 32,
            minimum: 1,
            example: 1
        },
        deliveryTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        description: {
            type: 'string',
            maxLength: 4096,
            minLength: 5,
            example: 'Example service description'
        },
        isOnline: {
            type: 'boolean',
            example: true
        },
        location: {
            type: 'string',
            maxLength: 256,
            minLength: 1,
            example: 'Example Location'
        },
        media: {
            type: 'string'
        },
        price: {
            type: 'number',
            maximum: 10000,
            minimum: 1,
            example: 10
        },
        priceTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        priceUnit: {
            type: 'string',
            example: 'USD'
        },
        title: {
            type: 'string',
            maxLength: 64,
            minLength: 5,
            example: 'Example Service'
        },
        url: {
            type: 'string',
            example: 'https://example.com'
        }
    }
} as const;

export const $HServicesHServiceMetadataDto = {
    description: 'HServiceMetadataDto',
    type: 'object',
    required: ['isBookmarked', 'isFavorite'],
    properties: {
        isBookmarked: {
            type: 'boolean',
            example: true
        },
        isFavorite: {
            type: 'boolean',
            example: true
        }
    }
} as const;

export const $HServicesHServiceResponseDto = {
    description: 'Basic service information with user information',
    type: 'object',
    required: ['category', 'createdAt', 'deliveryTime', 'deliveryTimespan', 'description', 'id', 'isOnline', 'location', 'media', 'price', 'priceTimespan', 'priceUnit', 'slug', 'title', 'totalPoints', 'totalVotes', 'updatedAt', 'user', 'userId'],
    properties: {
        category: {
            type: 'integer',
            example: 1
        },
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        deliveryTime: {
            type: 'integer',
            example: 1
        },
        deliveryTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        description: {
            type: 'string',
            example: 'Example service description'
        },
        id: {
            type: 'string',
            example: '7234882566245847040'
        },
        isOnline: {
            type: 'boolean',
            example: true
        },
        location: {
            type: 'string',
            example: 'Example Location'
        },
        media: {
            type: 'object',
            additionalProperties: {}
        },
        price: {
            type: 'number',
            example: 10
        },
        priceTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        priceUnit: {
            type: 'string',
            example: 'USD'
        },
        slug: {
            type: 'string',
            example: 'example-service'
        },
        title: {
            type: 'string',
            example: 'Example Service'
        },
        totalPoints: {
            type: 'integer',
            example: 50
        },
        totalVotes: {
            type: 'integer',
            example: 10
        },
        updatedAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        url: {
            type: 'string',
            example: 'https://example.com'
        },
        user: {
            '$ref': '#/definitions/HServicesUserResponseDto'
        },
        userId: {
            type: 'string',
            example: '528696135489945615'
        }
    }
} as const;

export const $HServicesHServiceWithoutUserResponseDto = {
    description: 'Basic service information without user information',
    type: 'object',
    required: ['category', 'createdAt', 'deliveryTime', 'deliveryTimespan', 'description', 'id', 'isOnline', 'location', 'media', 'price', 'priceTimespan', 'priceUnit', 'slug', 'title', 'totalPoints', 'totalVotes', 'updatedAt', 'userId'],
    properties: {
        category: {
            type: 'integer',
            example: 1
        },
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        deliveryTime: {
            type: 'integer',
            example: 1
        },
        deliveryTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        description: {
            type: 'string',
            example: 'Example service description'
        },
        id: {
            type: 'string',
            example: '7234882566245847040'
        },
        isOnline: {
            type: 'boolean',
            example: true
        },
        location: {
            type: 'string',
            example: 'Example Location'
        },
        media: {
            type: 'object',
            additionalProperties: {}
        },
        price: {
            type: 'number',
            example: 10
        },
        priceTimespan: {
            type: 'string',
            example: 'HOURLY'
        },
        priceUnit: {
            type: 'string',
            example: 'USD'
        },
        slug: {
            type: 'string',
            example: 'example-service'
        },
        title: {
            type: 'string',
            example: 'Example Service'
        },
        totalPoints: {
            type: 'integer',
            example: 50
        },
        totalVotes: {
            type: 'integer',
            example: 10
        },
        updatedAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        url: {
            type: 'string',
            example: 'https://example.com'
        },
        userId: {
            type: 'string',
            example: '528696135489945615'
        }
    }
} as const;

export const $HServicesUserResponseDto = {
    description: 'Basic user information',
    type: 'object',
    required: ['createdAt', 'fullName', 'id', 'username'],
    properties: {
        createdAt: {
            type: 'string',
            example: '2024-08-26T10:24:13.508676+03:00'
        },
        fullName: {
            type: 'string',
            example: 'John Doe'
        },
        gender: {
            type: 'string',
            example: 'male'
        },
        id: {
            type: 'string',
            example: '528696135489945615'
        },
        profileImage: {
            type: 'string',
            example: 'https://example.com/image.jpg'
        },
        username: {
            type: 'string',
            example: 'johndoe'
        }
    }
} as const;

export const $HealthGetHealthResponseDto = {
    description: 'GetHealthResponseDto',
    type: 'object',
    required: ['message'],
    properties: {
        message: {
            type: 'string'
        }
    }
} as const;

export const $UploadsUploadObj = {
    description: 'UploadObj',
    type: 'object',
    required: ['key', 'url'],
    properties: {
        key: {
            type: 'string',
            example: 'a690dd36-6a90-465f-81d5-bf0a03be084c'
        },
        url: {
            type: 'string',
            example: 'https://example.com/image.jpg'
        }
    }
} as const;

export const $echo_HTTPError = {
    type: 'object',
    properties: {
        message: {}
    }
} as const;

export const $pagination_Pagination = {
    type: 'object',
    properties: {
        hasNext: {
            type: 'boolean'
        },
        hasPrevious: {
            type: 'boolean'
        },
        page: {
            type: 'integer'
        },
        pageSize: {
            type: 'integer'
        },
        totalPages: {
            type: 'integer'
        },
        totalRecords: {
            type: 'integer'
        }
    }
} as const;