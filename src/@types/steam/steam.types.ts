import { Timestamp } from 'firebase-admin/firestore'

interface IAssetDescription {
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: {
    type: string;
    value: string
  }[],
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  commodity: number;
  market_tradable_restriction: number;
  marketable: number;
  market_buy_country_restriction: string;
}

interface ISearchData {
  query: string;
  search_descriptions: false,
  total_count: number;
  pagesize: number;
  prefix: string;
  class_prefix: string;
}

interface IResults {
  name: string;
  hash_name: string;
  sell_listings: number;
  sell_price: number;
  sell_price_text: string;
  app_icon: string;
  app_name: string;
  asset_description: IAssetDescription;
  sale_price_text: string;
}

export interface ISteamResponse {
  pagesize: number;
  results: IResults;
  searchdata: ISearchData;
  success: boolean;
  start: number;
  total_count: number;
}

export type ISteamData = {
  _id: string;
  _metadata: {
    createdAt: Timestamp;
    updateAt: Timestamp;
  };
} & ISteamResponse;
