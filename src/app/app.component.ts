import { Component } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

data : any;
show: Number = 0;

  constructor(private http:Http){

      console.log("Inside click");
      http.get('http://localhost:8081/scrape')
        //  .map(res => res.json())
          .subscribe(data => {
            let body1:string = JSON.parse(data['_body']);
                    console.log(body1);
                    this.data  = body1;
                    for(var i = 0; i < body1.length; i++) {
                      var obj:any = body1[i];
                       console.log(obj.headshot2);
}


            //this.data = body1;
      }, error =>{
        console.log(error);
      }
      );
  }

  title = 'app';

  open() {
    this.toShow = true;

    // var i, tabcontent, tablinks;
    // tabcontent = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < tabcontent.length; i++) {
    //     console.log('tabcontent',tabcontent[i])
    //     tabcontent[i].style.display = "none";
    // }
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //     tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }
    // document.getElementById(minister).style.display = "block";
    // evt.currentTarget.className += "active";
    // }
    // document.getElementById("defaultOpen").click();

}

// Get the element with id="defaultOpen" and click on it


}
