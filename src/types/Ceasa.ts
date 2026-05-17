// TODO: adaptar para conexão real API de preços CEASA
export type ExternalCeasaPriceItem = {
    id?: string;
    uf: string;
    productTitle: string;
    slug: string;
    price: number;
    priceVariation: number;
  };
  
export type ExternalCeasaPricesResponse = ExternalCeasaPriceItem[] | { data: ExternalCeasaPriceItem[] };

export type CeasaPriceItem = { link: string } & ExternalCeasaPriceItem;
  