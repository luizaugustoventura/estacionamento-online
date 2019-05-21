import { Injectable } from '@angular/core';
import { Pagamento } from '../pagamento';
import { Time } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map, take, find} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  pagamentos: Observable<Pagamento[]>;
  pagamentosCollection: AngularFirestoreCollection<Pagamento>;

  constructor(private afs: AngularFirestore ) { 
    this.pagamentosCollection = this.afs.collection<Pagamento>('pagamentos');
   
    this.pagamentos = this.pagamentosCollection.snapshotChanges().
      pipe(
        map( actions => {
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  busca(codigo: number): Pagamento {
    
    this.pagamentos.forEach( pagamentos => {
      pagamentos.forEach( p => {
        if (p.codigo == codigo)
          console.log("Código: " + p.codigo + " // Entrada: " + p.entrada + " // Saída: " + p.saida);
          return p;
      });
    });
    return new Pagamento(0, '', '');
  }

  getListaPagamentos(): Observable<Pagamento[]> {
    return this.pagamentos;
  }

  getPagamento(codigo: number): Observable<Pagamento> {
    return this.pagamentosCollection.doc<Pagamento>(codigo.toString()).valueChanges().
      pipe(
        take(1),
        map( pagamento => {
          console.log("Teste: " + pagamento);
          pagamento.codigo = codigo;
          return pagamento;
        })
      );
  }

  setPagamento(pagamento: Pagamento): Promise<DocumentReference> {
    //Verificando se um pagamento com aquele código já existe
    /*let p: Observable<Pagamento> = this.pagamentosCollection.doc<Pagamento>(pagamento.codigo.toString()).valueChanges()
      .pipe(
        take(1),
        map( data => {
          data.codigo = pagamento.codigo;
          return data;
        })
      );
    */
  
    /*
    if (p['codigo'] != pagamento.codigo)
    {
      this.pagamentosCollection.add(pagamento);
      return true;
    }
    else
      return false;*/
    const p = {
      codigo: pagamento.codigo,
      entrada: pagamento.entrada,
      saida: pagamento.saida
    }

    return this.pagamentosCollection.add(p);
  }

  calcularPreco(entrada: string, saida: string): number {
    let e: Time = { hours: parseInt( entrada.split(':')[0] ) , minutes: parseInt( entrada.split(':')[1] ) };
    let s: Time = { hours: parseInt( saida.split(':')[0] ) , minutes: parseInt( saida.split(':')[1] ) };

    if ((e.hours > s.hours) || ((e.hours == s.hours) && (e.minutes == s.minutes)))
      return 0;

    let diff: Time = {hours: 0, minutes: 0};
    let valor = 5;

    console.log("Entrada: " + e.hours + ":" + e.minutes + " // Saída: " + s.hours + ":" + s.minutes);
    //console.log("Entrada: " + e + " // Saída: " + s);

    if (e.minutes > s.minutes) {
      diff.minutes = (s.minutes + 60) - e.minutes;
      diff.hours = (s.hours - e.hours) - 1;
    }
    else {
      diff.minutes = s.minutes - e.minutes;
      diff.hours = s.hours - e.hours;
    }

    if (diff.minutes < 30) {
        if (diff.hours <= 0) {
          console.log("Valor: " + valor);
          return valor;
        }
        else {
          valor = diff.hours * 5;
          console.log("Valor: " + valor);
          return valor;
        }
    }
    else {
      valor = (diff.hours + 1) * 5;
      console.log("Valor: " + valor);
      return valor;
    }
    
 
    /* código mais limpo, eliminiaria um if e um else
    if(valor <= 0) {
      valor = 5
    } 
    return valor;
    */
  }
}
