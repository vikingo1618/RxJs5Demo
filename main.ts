import { Observable, Observer } from "rxjs";
import { elementAt } from "rxjs/operators";

let output=document.getElementById('output');
let button=document.getElementById('button');
let buttonMax=document.getElementById('buttonMax');

let click=Observable.fromEvent(button,'click');
let clickMax =Observable.fromEvent(buttonMax,'click');

function load(url:string){

    return Observable.create(observer => {
        
        let xhr=new XMLHttpRequest();
        xhr.addEventListener('load',()=>{
        
        if(xhr.status===200){
            let jsonNames=JSON.parse(xhr.responseText);
            observer.next(jsonNames);
            observer.complete();
        }else{
            observer.error(xhr.statusText);
        } 
        
    });

    xhr.open('GET',url);
    xhr.send();

    });

}



function renderNames(jsonNames){
    jsonNames.forEach(element => {
        let div=document.createElement('div');
        div.innerText=`${element.name}`;
        output.appendChild(div);
    });
    let cal=Observable.from(jsonNames).filter(x => x>60);
}


click.flatMap(x => load('becarios.json'))
        .subscribe((x : any) => Observable.from(x).filter((x : any) => x.grade >= 60).subscribe(
            x => console.log(x.name)));

clickMax.flatMap(x => load('becarios.json'))
        .subscribe((x : any) => Observable.from(x).max((x : any) => x.grade).subscribe(
            x => console.log(x.grade)));