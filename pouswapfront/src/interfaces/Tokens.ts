export interface TokenInterface {
    ID: number;
    address: string;
    logo: string;
    name: string;
    price: number;
    symbole: string;
    pools: string;
    trades?: number;
    volume?: number;
  }