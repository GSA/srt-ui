import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { HelpService } from "../services/help.service";
import * as $ from 'jquery'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public metrix = "{ (1) ∪ { (2) ∩ (3) } }"
  id = "";
  params: any;
  faq: any[];

  constructor(
      private helpService:HelpService,
      private route: ActivatedRoute
  ) {}

  Scroll(ID) {
    var element = document.getElementById(ID);
    $('html, body').animate({
        scrollTop: $(element).offset().top - 80
    });
  }


  ngOnInit() {
    //lifecycle hook

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

        // Wait for html
        setTimeout(() => {
            $('.'+this.id).click();
            this.faqSearch();
        }, 500);

    }

    this.helpService.getPosts()
        .subscribe (
            data => this.faq = data,
            error => console.log(error)
    )

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
