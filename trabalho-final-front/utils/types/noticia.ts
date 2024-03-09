export interface INews {
    data: Daum[]
    meta: Meta
  }
  
  export interface Daum {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    Titulo: string
    Conteudo: Conteudo[]
    createdAt: string
    updatedAt: string
    publishedAt: string
    Autor: string
    Lead: string
    Thumbnail: Thumbnail
  }
  
  export interface Conteudo {
    type: string
    children: Children[]
  }
  
  export interface Children {
    type: string
    text: string
  }
  
  export interface Thumbnail {
    data: Data
  }
  
  export interface Data {
    id: number
    attributes: imageAttributes
  }
  
  export interface imageAttributes {
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
  }
  
  export interface Formats {
    thumbnail: Image
  }
  
  export interface Image {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    url: string
  }
  
  export interface Meta {
    pagination: Pagination
  }
  
  export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
  