// This file is auto-generated by @hey-api/openapi-ts

/**
 * Basic service information with user information
 */
export type AggregationsHServiceResponseDto = {
    category: number;
    createdAt: string;
    deliveryTime: number;
    deliveryTimespan: string;
    description: string;
    id: string;
    isOnline: boolean;
    location: string;
    media: {
        [key: string]: unknown;
    };
    price: number;
    priceTimespan: string;
    priceUnit: string;
    slug: string;
    title: string;
    totalPoints: number;
    totalVotes: number;
    updatedAt: string;
    url?: string;
    user: AggregationsUserResponseDto;
    userId: string;
};

/**
 * Basic user information
 */
export type AggregationsUserResponseDto = {
    createdAt: string;
    fullName: string;
    gender?: string;
    id: string;
    profileImage?: string;
    username: string;
};

export type AuthGetMeResponseDto = {
    createdAt: string;
    email: string;
    fullName: string;
    gender?: string;
    googleId?: string;
    id: string;
    isActive: boolean;
    isEmailVerified: boolean;
    lastLogin: string;
    profileImage?: string;
    role: string;
    updatedAt: string;
    username: string;
};

/**
 * Login request dto
 */
export type AuthLoginRequestDto = {
    email: string;
    password: string;
};

export type AuthRegisterRequestDto = {
    email: string;
    fullName: string;
    password: string;
    username: string;
};

export type AuthResetPasswordRequestDto = {
    code: string;
    email: string;
    newPassword: string;
};

export type AuthSendForgotPasswordEmailRequestDto = {
    email: string;
};

export type AuthSendVerificationEmailRequestDto = {
    email: string;
};

/**
 * Basic bookmark information
 */
export type BookmarksBookmarksResponseDto = {
    createdAt: string;
    hservice: BookmarksHServiceDto;
    hserviceId: string;
    id: string;
    userId: string;
};

/**
 * CreateBookmarkRequestDto
 */
export type BookmarksCreateBookmarkRequestDto = {
    hserviceId: string;
};

/**
 * CreateBookmarkResponseDto
 */
export type BookmarksCreateBookmarkResponseDto = {
    id: string;
};

/**
 * Basic service information without user information
 */
export type BookmarksHServiceDto = {
    category: number;
    createdAt: string;
    deliveryTime: number;
    deliveryTimespan: string;
    description: string;
    id: string;
    isOnline: boolean;
    location: string;
    media: {
        [key: string]: unknown;
    };
    price: number;
    priceTimespan: string;
    priceUnit: string;
    slug: string;
    title: string;
    totalPoints: number;
    totalVotes: number;
    updatedAt: string;
    url?: string;
    userId: string;
};

/**
 * CreateFavoriteRequestDto
 */
export type FavoritesCreateFavoriteRequestDto = {
    hserviceId: string;
};

/**
 * CreateFavoriteResponseDto
 */
export type FavoritesCreateFavoriteResponseDto = {
    id: string;
};

/**
 * Basic favorite information
 */
export type FavoritesFavoritesResponseDto = {
    createdAt: string;
    hservice: FavoritesHServiceDto;
    hserviceId: string;
    id: string;
    userId: string;
};

/**
 * Basic service information without user information
 */
export type FavoritesHServiceDto = {
    category: number;
    createdAt: string;
    deliveryTime: number;
    deliveryTimespan: string;
    description: string;
    id: string;
    isOnline: boolean;
    location: string;
    media: {
        [key: string]: unknown;
    };
    price: number;
    priceTimespan: string;
    priceUnit: string;
    slug: string;
    title: string;
    totalPoints: number;
    totalVotes: number;
    updatedAt: string;
    url?: string;
    userId: string;
};

/**
 * Response for home aggregations
 */
export type GetHomeAggregationsResponseDto = {
    favorites: Array<AggregationsHServiceResponseDto>;
    featured: Array<AggregationsHServiceResponseDto>;
    new: Array<AggregationsHServiceResponseDto>;
    popular: Array<AggregationsHServiceResponseDto>;
};

export type HMR = {
    data: unknown;
    metadata: unknown;
};

export type HPR = {
    data: unknown;
    pagination: pagination_Pagination;
};

export type HR = {
    data: unknown;
};

/**
 * CreateHServiceRequestDto
 */
export type HServicesCreateHServiceRequestDto = {
    category: number;
    deliveryTime: number;
    deliveryTimespan: string;
    description: string;
    isOnline: boolean;
    location: string;
    media: string;
    price: number;
    priceTimespan: string;
    priceUnit: string;
    title: string;
    url?: string;
};

/**
 * HServiceMetadataDto
 */
export type HServicesHServiceMetadataDto = {
    isBookmarked: boolean;
    isFavorite: boolean;
};

/**
 * Basic service information with user information
 */
export type HServicesHServiceResponseDto = {
    category: number;
    createdAt: string;
    deliveryTime: number;
    deliveryTimespan: string;
    description: string;
    id: string;
    isOnline: boolean;
    location: string;
    media: {
        [key: string]: unknown;
    };
    price: number;
    priceTimespan: string;
    priceUnit: string;
    slug: string;
    title: string;
    totalPoints: number;
    totalVotes: number;
    updatedAt: string;
    url?: string;
    user: HServicesUserResponseDto;
    userId: string;
};

/**
 * Basic service information without user information
 */
export type HServicesHServiceWithoutUserResponseDto = {
    category: number;
    createdAt: string;
    deliveryTime: number;
    deliveryTimespan: string;
    description: string;
    id: string;
    isOnline: boolean;
    location: string;
    media: {
        [key: string]: unknown;
    };
    price: number;
    priceTimespan: string;
    priceUnit: string;
    slug: string;
    title: string;
    totalPoints: number;
    totalVotes: number;
    updatedAt: string;
    url?: string;
    userId: string;
};

/**
 * Basic user information
 */
export type HServicesUserResponseDto = {
    createdAt: string;
    fullName: string;
    gender?: string;
    id: string;
    profileImage?: string;
    username: string;
};

/**
 * GetHealthResponseDto
 */
export type HealthGetHealthResponseDto = {
    message: string;
};

/**
 * UploadObj
 */
export type UploadsUploadObj = {
    key: string;
    url: string;
};

export type echo_HTTPError = {
    message?: unknown;
};

export type pagination_Pagination = {
    hasNext?: boolean;
    hasPrevious?: boolean;
    page?: number;
    pageSize?: number;
    totalPages?: number;
    totalRecords?: number;
};

export type GetAggregationsHomeResponse = ((HR & {
    data?: GetHomeAggregationsResponseDto;
}));

export type GetAggregationsHomeError = (unknown);

export type PostAuthCredentialsLoginData = {
    /**
     * Request body
     */
    body: AuthLoginRequestDto;
};

export type PostAuthCredentialsLoginResponse = (unknown);

export type PostAuthCredentialsLoginError = (echo_HTTPError);

export type PostAuthCredentialsRegisterData = {
    /**
     * Request body
     */
    body: AuthRegisterRequestDto;
};

export type PostAuthCredentialsRegisterResponse = (unknown);

export type PostAuthCredentialsRegisterError = (echo_HTTPError);

export type PostAuthForgotPasswordResetData = {
    /**
     * Request body
     */
    body: AuthResetPasswordRequestDto;
};

export type PostAuthForgotPasswordResetResponse = (unknown);

export type PostAuthForgotPasswordResetError = (echo_HTTPError);

export type PostAuthForgotPasswordSendData = {
    /**
     * Request body
     */
    body: AuthSendForgotPasswordEmailRequestDto;
};

export type PostAuthForgotPasswordSendResponse = (unknown);

export type PostAuthForgotPasswordSendError = (echo_HTTPError);

export type PostAuthLogoutResponse = (void);

export type PostAuthLogoutError = (echo_HTTPError);

export type GetAuthMeResponse = ((HR & {
    data?: AuthGetMeResponseDto;
}));

export type GetAuthMeError = (echo_HTTPError);

export type PostAuthVerifyEmailSendData = {
    /**
     * Request body
     */
    body: AuthSendVerificationEmailRequestDto;
};

export type PostAuthVerifyEmailSendResponse = (unknown);

export type PostAuthVerifyEmailSendError = (echo_HTTPError);

export type GetAuthVerifyEmailVerifyData = {
    query: {
        /**
         * Verification code
         */
        code: string;
    };
};

export type GetAuthVerifyEmailVerifyResponse = (unknown);

export type GetAuthVerifyEmailVerifyError = (echo_HTTPError);

export type GetBookmarksData = {
    query?: {
        /**
         * Page number
         */
        page?: number;
        /**
         * Page size
         */
        pageSize?: number;
    };
};

export type GetBookmarksResponse = ((HPR & {
    data?: Array<BookmarksBookmarksResponseDto>;
}));

export type GetBookmarksError = (echo_HTTPError);

export type PostBookmarksData = {
    /**
     * Request body
     */
    body: BookmarksCreateBookmarkRequestDto;
};

export type PostBookmarksResponse = ((HR & {
    data?: BookmarksCreateBookmarkResponseDto;
}));

export type PostBookmarksError = (echo_HTTPError);

export type GetBookmarksByHserviceIdData = {
    path: {
        /**
         * HService ID
         */
        hservice_id: string;
    };
};

export type GetBookmarksByHserviceIdResponse = ((HR & {
    data?: boolean;
}));

export type GetBookmarksByHserviceIdError = (echo_HTTPError);

export type DeleteBookmarksByHserviceIdData = {
    path: {
        /**
         * HService ID
         */
        hservice_id: string;
    };
};

export type DeleteBookmarksByHserviceIdResponse = (void);

export type DeleteBookmarksByHserviceIdError = (echo_HTTPError);

export type GetFavoritesData = {
    query?: {
        /**
         * Page number
         */
        page?: number;
        /**
         * Page size
         */
        pageSize?: number;
    };
};

export type GetFavoritesResponse = ((HPR & {
    data?: Array<FavoritesFavoritesResponseDto>;
}));

export type GetFavoritesError = (echo_HTTPError);

export type PostFavoritesData = {
    /**
     * Request body
     */
    body: FavoritesCreateFavoriteRequestDto;
};

export type PostFavoritesResponse = ((HR & {
    data?: FavoritesCreateFavoriteResponseDto;
}));

export type PostFavoritesError = (echo_HTTPError);

export type GetFavoritesUsernameByUsernameData = {
    path: {
        /**
         * Username
         */
        username: string;
    };
    query?: {
        /**
         * Page number
         */
        page?: number;
        /**
         * Page size
         */
        pageSize?: number;
    };
};

export type GetFavoritesUsernameByUsernameResponse = ((HPR & {
    data?: Array<FavoritesFavoritesResponseDto>;
}));

export type GetFavoritesUsernameByUsernameError = (echo_HTTPError);

export type GetFavoritesByHserviceIdData = {
    path: {
        /**
         * HService ID
         */
        hservice_id: string;
    };
};

export type GetFavoritesByHserviceIdResponse = ((HR & {
    data?: boolean;
}));

export type GetFavoritesByHserviceIdError = (echo_HTTPError);

export type DeleteFavoritesByHserviceIdData = {
    path: {
        /**
         * HService ID
         */
        hservice_id: string;
    };
};

export type DeleteFavoritesByHserviceIdResponse = (void);

export type DeleteFavoritesByHserviceIdError = (echo_HTTPError);

export type GetHealthResponse = (HealthGetHealthResponseDto);

export type GetHealthError = unknown;

export type GetHservicesData = {
    query?: {
        /**
         * Page number
         */
        page?: number;
        /**
         * Page size
         */
        pageSize?: number;
    };
};

export type GetHservicesResponse = ((HPR & {
    data?: Array<HServicesHServiceWithoutUserResponseDto>;
}));

export type GetHservicesError = (echo_HTTPError);

export type PostHservicesData = {
    /**
     * Request body
     */
    body: HServicesCreateHServiceRequestDto;
};

export type PostHservicesResponse = ((HR & {
    data?: HServicesHServiceWithoutUserResponseDto;
}));

export type PostHservicesError = (echo_HTTPError);

export type GetHservicesUserByUsernameData = {
    path: {
        /**
         * Username
         */
        username: string;
    };
    query?: {
        /**
         * Page number
         */
        page?: number;
        /**
         * Page size
         */
        pageSize?: number;
    };
};

export type GetHservicesUserByUsernameResponse = ((HPR & {
    data?: Array<HServicesHServiceResponseDto>;
}));

export type GetHservicesUserByUsernameError = (echo_HTTPError);

export type GetHservicesByIdData = {
    path: {
        /**
         * HService ID
         */
        id: string;
    };
};

export type GetHservicesByIdResponse = ((HMR & {
    data?: HServicesHServiceResponseDto;
    meta?: HServicesHServiceMetadataDto;
}));

export type GetHservicesByIdError = (echo_HTTPError);

export type GetUploadsNewUrlData = {
    query: {
        /**
         * Number of files to be uploaded
         */
        count: number;
        /**
         * Mime type of the files to be uploaded
         */
        mime: string;
        /**
         * Type of upload
         */
        type: string;
    };
};

export type GetUploadsNewUrlResponse = ((HR & {
    data?: Array<UploadsUploadObj>;
}));

export type GetUploadsNewUrlError = (echo_HTTPError);