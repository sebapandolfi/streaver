export interface GeoLocationData {
    id: number;
    lat: string;
    lng: string;
  }
  
  export interface AddressData {
    id: number;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geoLocationId: number;
  }
  
  export interface CompanyData {
    id: number;
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
  export interface UsersTrimData {
    id: number;
    companyId: number;
    addressId: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
  }
  
  export interface PostData {
    id: number;
    userId: number;
    title: string;
    body: string;
  }
  