import { Observable, Observer } from "rxjs";
import { elementAt } from "rxjs/operators";

let source = Observable.fromEvent(document, `mousemove`).map((event: any) => {
                                    return {
                                        x: event.clientX,
                                        y: event.clientY
                                    }
                                }).filter(element => {
                                    return element.x > 500;
                                });

source.subscribe(
    value => {
        console.log(`valueX: ${value.x} valueY: ${value.y}`);
    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);