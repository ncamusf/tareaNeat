import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'news-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-window.component.html',
  styleUrls: ['./news-window.component.css']
})
export class NewsWindowComponent implements OnInit {
  newsList: Array<{ title: string, description: string, date: Date, link: string, image: string }> = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    //La idea seria llamar a una API
    this.newsList = [
      { 
        title: 'El futuro de las criptomonedas', 
        description: 'Un análisis de cómo las criptomonedas están cambiando el panorama financiero global.', 
        date: new Date(), 
        link: 'https://www.bbc.com/mundo/noticias-58955651', 
        image: 'https://cdn.pixabay.com/photo/2017/01/25/12/31/bitcoin-2007769_1280.jpg' 
      },
      { 
        title: 'Nuevas regulaciones para el comercio de criptomonedas', 
        description: 'Los gobiernos están comenzando a implementar regulaciones más estrictas para el comercio de criptomonedas.', 
        date: new Date(), 
        link: 'https://www.eltiempo.com/economia/finanzas-personales/criptomonedas-btc-eth-y-otros-conocimientos-en-la-nueva-ley-720491', 
        image: 'https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg' 
      },
      { 
        title: 'La carrera final de las crptomonedas', 
        description: 'Explorando el papel de la inteligencia artificial en el análisis de datos de criptomonedas.', 
        date: new Date(), 
        link: 'https://www.df.cl/tags/criptomonedas/p/1', 
        image: 'https://www.df.cl/noticias/site/artic/20240917/imag/foto_0000000120240917165158/Cripto-2024-09-21-2.jpg' 
      },
    ];
  }
}