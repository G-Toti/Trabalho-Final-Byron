
export function pontos(vitorias: number, empates: number)
{
    return vitorias * 3 + empates;
}

export function saldoDeGols(golsMarcados : number, golsSofridos : number)
{
    return golsMarcados - golsSofridos;
}

export function aproveitamento(pontos : number, numeroDeJogos : number)
{
    return pontos / (numeroDeJogos * 3);
}