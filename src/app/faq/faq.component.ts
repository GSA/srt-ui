import { Component, OnInit } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 

  faqSearch() {
      var txt = $('#search').val();      
      $('.search-content').each(function(){        
          if($(this).text().toLowerCase().indexOf(txt.toLowerCase()) != -1)           
              $(this).show();
          else
              $(this).hide();
      });

      $('.search-title').each(function(){        
          if($(this).text().toLowerCase().indexOf(txt.toLowerCase()) != -1)           
              $(this).show();
          else 
              $(this).hide();
      });
  }



}
