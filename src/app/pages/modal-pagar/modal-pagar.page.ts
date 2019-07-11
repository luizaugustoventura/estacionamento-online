import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pagamento } from 'src/app/pagamento';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-modal-pagar',
  templateUrl: './modal-pagar.page.html',
  styleUrls: ['./modal-pagar.page.scss'],
})
export class ModalPagarPage implements OnInit {

  @Input() pagamento: Pagamento;
  @Input() valor: number;
  mensagem: string = 'Pagamento cancelado';

  p: Pagamento = new Pagamento(0, '', '');
  P: boolean = false;

  constructor(private modalController: ModalController,
              private servicos: ServicosService) { //this.p = this.servicos.busca(this.pagamento.codigo); 
  }

  ngOnInit() { 
    this.p = this.servicos.busca(this.pagamento.codigo);
  }

  armazenar() {
    /*
    if ((this.valor <= 0))
      this.mensagem = "Ticket já pago ou dados entrada e saída incorretos!";
    else
      this.mensagem = "Pagamento efetuado com sucesso!";
    */
    
    /*
    this.servicos.getPagamento(this.pagamento.codigo)
      .subscribe( data => {
        this.p = data;
        console.log("Código pagamento: " + this.p.codigo);
        console.log("Código entrada: " + this.p.entrada);
        console.log("Código saida: " + this.p.saida);
      } );
    */

    console.log(this.servicos.busca(this.pagamento.codigo));
    console.log("Objeto consultado: " + this.p.codigo);
    
    if(this.p.codigo == this.pagamento.codigo) 
    {
      console.log("Pagamento barrado!");
      this.mensagem = "Este ticket já foi pago!";
      this.dismiss();
      return;
    }
    
    if(this.valor <=0)
    {
      this.mensagem = "Horários de entrada e saída inválidos!";
      this.dismiss();
      return;
    }

    this.servicos.setPagamento(this.pagamento) 
      .then(
        () => {
          this.mensagem = 'Pagamento efetuado com sucesso!';
          this.dismiss();
        }), 
      () => {
        this.mensagem = 'Erro ao efetuar pagamento!';
        this.dismiss();
      }
  }

  dismiss() {
    this.modalController.dismiss({
      data: this.mensagem
    });
  }
}
