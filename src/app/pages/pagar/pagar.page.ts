import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPagarPage } from '../modal-pagar/modal-pagar.page';
import { Time } from '@angular/common';
import { ServicosService } from 'src/app/services/servicos.service';
import { Pagamento } from 'src/app/pagamento';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  p: Pagamento;
  codigo_ticket = 0;
  valorTotal = 0;

  form_pagamento: FormGroup;

  constructor(private modalController: ModalController,
              private toastController: ToastController,
              private servicos: ServicosService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form_pagamento = this.formBuilder.group({
      codigo: new FormControl('', Validators.required),
      entrada: new FormControl('', Validators.required),
      saida: new FormControl('', Validators.required)
    }); 
  }

  async chamarToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async chamarModal () {
    const modal = await this.modalController.create({
      component: ModalPagarPage,
      componentProps: { pagamento: this.p, valor: this.valorTotal }
    });
  
    modal.onDidDismiss().then(data => {
      this.chamarToast(((String)(Object.values(data['data']))));
    });

    return await modal.present();
  }

  
  calcularTotal(entrada: string, saida: string) {
    this.valorTotal = this.servicos.calcularPreco(entrada, saida);

    this.p = new Pagamento(this.codigo_ticket, entrada, saida);
   
    this.chamarModal();
  }
}
