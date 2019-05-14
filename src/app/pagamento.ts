export class Pagamento {
    codigo: number;
    entrada: string;
    saida: string;

    constructor(c: number, e: string, s: string) {
        this.codigo = c;
        this.entrada = e;
        this.saida = s;
    }
}