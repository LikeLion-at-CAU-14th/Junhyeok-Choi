export interface Todo{
    id:number;
    text:string;
    isDone:boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface QuoteResponse {
    id:number;
    quote:string;
    author:string
}