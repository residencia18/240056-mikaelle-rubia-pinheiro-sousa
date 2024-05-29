export interface AuthResquest {
  email: string;
  password:string
}


export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}
