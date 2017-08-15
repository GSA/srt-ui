import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public metrix = "{ (1) ∪ { (2) ∩ (3) } }"
  constructor(
      private route: ActivatedRoute
  ) { }
  id = "";
  params: any;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id != null)
    {
        let element = document.getElementById(this.id);
        if (this.id == "ICT") 
        {
            $('#search').val("What is \"Information and Communication Technology\"(ICT)?")  
        }
        else if (this.id == "EIT") 
        {
            $('#search').val("What is \"Electronic and Information Technology\"(E&IT)?")
        }      
        $('.'+this.id).click();      
        this.faqSearch();
    }
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
