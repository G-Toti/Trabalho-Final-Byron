export interface ITabela {
    campeonatos: ICampeonato[]
  }
  
  export interface ICampeonato {
    id: number
    nome: string
    rodadas: IRodada[]
  }
  
  export interface IRodada {
    id: number
    jogos: IJogo[]
  }
  
  export interface IJogo {
    id: number
    local: string
    data: string
    horario: string
    times: ITime[]
    resultado: string // exemplo: "1x0" (CASAxVISITANTE)
  }
  
  export interface ITime {
    id: number
    nome: string
    sigla: string
    brasao: string
    estatisticas: IEstatisticas
    jogadores: IJogador[]
  }
  
  export interface IEstatisticas {
    id: number
    pontos: number
    numeroDeJogos: number
    vitorias: number
    empates: number
    derrotas: number
    golsMarcados: number
    golsSofridos: number
    saldoDeGols: number
    aproveitamento: number
  }
  
  export interface IJogador {
    id: number
    nome: string
    gols: number
    foto: string
    posicao: string
  }