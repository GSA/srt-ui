import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SolicitationService } from '../../../solicitation.service';
import { SurveyService } from '../../../survey.service';
import { Solicitation } from '../../../shared/solicitation';

@Component({
  selector: 'app-help-us-improve',
  templateUrl: './help-us-improve.component.html',
  styleUrls: ['./help-us-improve.component.css']
})
export class HelpUsImproveComponent implements OnInit {

  @Input() solicitation:Solicitation;
  @Output() update: EventEmitter<string> = new EventEmitter();

  constructor(private solicitationService: SolicitationService,
              private surveyService:SurveyService,
              private route: ActivatedRoute) { }

  private solicitationIndex: String;
  private subscription: Subscription;
  public surveys;
  public surveyModel = [];
  // public ICT:boolean;
  // public Prediction:boolean;
  public feedbackSent:boolean = false;

  ngOnInit() {
    var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    this.feedbackSent = this.solicitation.history.filter(function(e){return ((e["action"].indexOf('provided feedback on the solicitation prediction result') > -1) && (e["user"].indexOf(user) > -1))}).length > 0;   
    this.GetSurveys();
  }

  inputPercent(survey, answer) {    
    survey.Answer = answer;
    this.surveyModel[survey.ID] = answer;
  }

  textarea(survey, answer) {
    survey.Answer = answer;
    this.surveyModel[survey.ID] = answer;
  }

  checkBox(survey, answer, checked) {    
      if (checked)
      {
          if (survey.Type != 'multiple response')
          {
            survey.Answer = answer;
            this.surveyModel[survey.ID] = answer;
          }
          else {
            survey.Answer = survey.Answer=='' ? answer : survey.Answer+","+answer; 
            this.surveyModel[survey.ID] =  survey.Answer=='' ? answer : survey.Answer+","+answer; 
          }
      }      
      
  }

  GetSurveys() {
      this.surveyService.GetSurveys().subscribe(
        data => {
          this.surveys = data.sort(function(a,b){
            var anum = +a.ID;
            var bnum = +b.ID;
            if (anum> bnum) return 1;
            else return -1;
          });
          for (var i = 0; i < data.length; i++) {
            this.surveyModel.push("");
          }
        }
      )
  }


  feedback(){
      var now = new Date().toLocaleDateString();
      var user = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
      var r = this.solicitation.history.push({'date': now, 'action': "provided feedback on the solicitation prediction result", 'user': user , 'status' : ''});
      
      this.surveys.forEach(element => {           
          if(this.solicitation.feedback == null)
          {
              this.solicitation.feedback = [{'questionID': element.ID, 'question': element.Question, 'answer': element.Answer}];
          }
          else
          {
              this.solicitation.feedback.push({'questionID': element.ID, 'question': element.Question, 'answer': element.Answer})
          }
      });
            
      this.solicitationService.updateHistory(this.solicitation)
      .subscribe(
        msg => {
          this.feedbackSent = true;
          this.update.emit();
        },
        err => {
        });
  }

}
