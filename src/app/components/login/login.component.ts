import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
    formData:any={
      fullName:"",
      password:""
    }
  data: any = {
    fname: "john",
    pass:"12345"
   
  }

  
  

  constructor(private router :Router, private prod:ProductService) { }
 
  ngOnInit(): void {
  }

  postData(){
    console.log(this.data);
    console.log(this.formData);
    
    if (this.formData.fullName === this.data.fname && this.formData.password === this.data.pass) {
      // this.prod.val = true
      localStorage.setItem("prodVal", "1")
      this.router.navigateByUrl("/menu")
    }

    else {
      alert("incorrect credentials")
      this.router.navigateByUrl("/login")
      .then(() => {
        window.location.reload();
      });
    }
}
 
}
