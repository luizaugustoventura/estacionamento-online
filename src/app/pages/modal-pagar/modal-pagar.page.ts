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
  mensagem: string = "";

  constructor(private modalController: ModalController,
              private servicos: ServicosService) { }

  ngOnInit() {
  }

  armazenar() {
    /*
    if ((this.valor <= 0))
      this.mensagem = "Ticket já pago ou dados entrada e saída incorretos!";
    else
      this.mensagem = "Pagamento efetuado com sucesso!";
    */

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
