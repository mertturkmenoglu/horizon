export type SearchLocationResponse = GeoSearchResult[];

export type GeoLocation = {
  id: string;
  name: string;
  lat: string;
  long: string;
  country: string;
  admin: GeoLocationAdmin;
};

export type GeoLocationAdmin = {
  id: string;
  name: string;
};

export type GeoSearchResult = {
  similarity: number;
  entry: GeoLocation;
};
