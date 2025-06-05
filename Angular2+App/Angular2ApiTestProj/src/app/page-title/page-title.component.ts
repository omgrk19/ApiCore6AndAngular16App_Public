import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit, AfterViewInit {
  @Input() pageTitleName = ""
  page1 = ""
  pageUrl = ""
  strArr: any[] = []
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(prms => {
      //console.log("prms.get('id'): "+prms.get('id'))
      if (prms.get('id') === null) {
        //console.log("Null value get")

        let cArr2 = this.router.url.split('/')
        const cArr$ = of(cArr2)
        cArr$.pipe(
          map(ar => ar.filter(item => item !== ''))
        ).subscribe(filterArr => {

          let curl = ''
          for (let index = 0; index < filterArr.length; index++) {
            curl = curl + '/' + filterArr[index];            
            this.strArr.push({ value: curl, text:filterArr[index]})
          }
          //console.log(`Current Route: ${JSON.stringify(this.strArr)}`)

        })

      } else {        

        let cArr2 = this.router.url.split('/')
        const cArr$ = of(cArr2)
        cArr$.pipe(
          map(ar => ar.filter(item => item !== ''))
        ).subscribe(filterArr => {
          
          filterArr.pop()          
          filterArr[filterArr.length - 1] = filterArr[filterArr.length - 1] + '/' + prms.get('id')
          
          let curl = ''
          for (let index = 0; index < filterArr.length; index++) {
            curl = curl + '/' + filterArr[index];                        
            let textArr = filterArr[index].split('/')
            this.strArr.push({ value: curl, text:textArr[0]})
          }
          //console.log(`Current Route: ${JSON.stringify(this.strArr)}`)

        })

      }
    })

  }

  ngAfterViewInit(): void {
    // debugger
    // let links = document.querySelectorAll('#ulPageTitle li a');

    // links.forEach(link => {
    //   //console.log(link.getAttribute('href'))
    //   //console.log(`Current Attributes: ${JSON.stringify(link.getAttribute('href'))}`)
    //   link.removeAttribute('href');
    //   //link.setAttribute('href','#')

    // });
  }

  f_root(url: string): string {
    // debugger
    // this.route.paramMap.subscribe(prms => {
    //   //console.log("prms.get('id'): "+prms.get('id'))
    //   if (prms.get('id') === null) {
    //     //console.log("Null value get")

    //   } else {
    //     //console.log(prms.get('id')+" value get")
    //   }
    // })

    // let curl = this.router.url
    return ''
  }

}
