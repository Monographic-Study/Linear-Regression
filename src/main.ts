import { generate_graph } from "./graph";
import { generate_grid } from "./grid";
import { predict } from "./predict";

let csv = document.querySelector("#csv") as HTMLInputElement;

// csv.data[0][2];
csv.onchange = async (event) => {
    let e = event.target as HTMLInputElement;
    let file = e.files?.[0];
    let text = await file?.text();
    if (text == null) throw new Error("No Text");
    let csv = parse_csv(text);
    // console.table([csv.title, ...csv.data]);

    // Pre-Dealt Data
    let data_length = csv.data.length;
    let pre_dealt = preCalculate(csv, data_length);
    let coefficient = getLineCoefficient(pre_dealt);
    // console.log(pre_dealt);

    // Predict
    let array: number[][] = predict(pre_dealt, coefficient, data_length);

    // Display Graph and Grid
    generate_graph(pre_dealt, coefficient, data_length, array);
    generate_grid(array, csv);
}

export interface COEFFICIENT {
    a: number,
    b: number,
}

export interface CSV {
    title: string[],
    data: number[][],
}

export interface DATA {
    avg: number,
    sum: number,
    value: number[],
    sigma: number,
}

export interface PRE_DEALT {
    xData: DATA,
    yData: DATA,
    r: number,
    s_xx: number,
    s_yy: number,
    s_xy: number,
}

function parse_csv(text: string): CSV {
    let iter = text.split(/\r\n|\n/).filter(t => t.trim() != "");

    let title_text = iter[0];
    if (title_text == null) throw new Error("Title Missing");
    let title = title_text?.split(",")
    let data = iter.slice(1).map(t => t.split(",").map(parseFloat));
    return {
        title,
        data
    }
}

export function getLineCoefficient( pre_dealt: PRE_DEALT ){
    let xData:DATA = pre_dealt.xData;
    let yData:DATA = pre_dealt.yData; 
    let r:number = pre_dealt.r;
    let m: number = r * ( yData.sigma / xData.sigma )

    return{
        a: m,
        b: yData.avg - m * xData.avg,
    }
}

export function preCalculate( csv: CSV, data_lengh: number ){
    const dataAmount:number = data_lengh;
    let xData: DATA = { avg: 0, sum: 0, value: [], sigma: 0 };
    let yData: DATA = { avg: 0, sum: 0, value: [], sigma: 0 };

    let r, s_xx, s_yy, s_xy;

    for( let i = 0 ; i < dataAmount ; i++ ){
        // Test
        // console.log("___");
        // console.log(csv.data[i][0]);
        // console.log(xData.value[i]);
        // console.log(xData.sum);

        // For X
        xData.value[i] = csv.data[i][0];
        xData.sum += csv.data[i][0];

        //For Y
        yData.value[i] = csv.data[i][1];
        yData.sum += csv.data[i][1];
    }

    xData.avg = xData.sum / dataAmount;
    yData.avg = yData.sum / dataAmount;

    r = s_xx = s_xy = s_yy = 0;
    for( let i = 0 ; i < dataAmount ; i++ ){
        s_xy += ( xData.value[i] - xData.avg ) * ( yData.value[i] - yData.avg );
        s_xx += Math.pow(( xData.value[i] - xData.avg ), 2);
        s_yy += Math.pow(( yData.value[i] - yData.avg ), 2);
    }

    r = s_xy / ( Math.sqrt(s_xx) * Math.sqrt(s_yy) );
    xData.sigma = Math.sqrt( s_xx / dataAmount );
    yData.sigma = Math.sqrt( s_yy / dataAmount );

    return{
        xData,
        yData,
        r, s_xx, s_yy, s_xy,
    }
}

// import './style.css'
// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)