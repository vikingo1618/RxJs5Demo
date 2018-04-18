import { Observable, Observer } from "rxjs";
import { elementAt } from "rxjs/operators";

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button,'click');

function load(url: string){
    return Observable.create(observer =>{

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {

        if(xhr.status === 200){
            let jsonStarwars = JSON.parse(xhr.responseText);
            observer.next(jsonStarwars);
            observer.complete();
        }else{
            observer.error(xhr.statusText);
        }

    });

    xhr.open('GET',url);
    xhr.send();

       /* observer.error();
        observer.complete();*/
    });
}

function renderStarWars(jsonStarwars){
    jsonStarwars.forEach(element => {
        let div = document.createElement('div');
        div.innerText = `${element.name} is a ${element.category}`;
        output.appendChild(div);
    });
}

click.flatMap(x => load('starwars.json'))
    .subscribe(value =>{
    renderStarWars(value);
    },
                error =>{
                    console.log(`Error: ${error}`);
                });

/*click.subscribe(
    value => {
        load('starwars.json')
        .retry(4)
        .filter(x => x.name === 'Lord Sith')
        .subscribe(value =>{
                    renderStarWars(value);
        },
                    error =>{
                        console.log(`Error: ${error}`);
                    });
    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);*/