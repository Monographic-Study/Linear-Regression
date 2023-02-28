import { PRE_DEALT, COEFFICIENT } from "./main";

export function predict( pre_dealt: PRE_DEALT, coefficient: COEFFICIENT, data_length: number ){
    let xData: number[] = pre_dealt.xData.value;
    let yData: number[] = pre_dealt.yData.value;

    let dif: number = xData[1] - xData[0];

    // Put All Given x into array 'array'
    const array = [];
    for( let i = 0 ; i < data_length ; i++ ) array.push([xData[i], yData[i]]);

    let length: number = array.length-1;
    let max = find_maximumX(xData);
    console.log(max);
    for( let i = length ; i < length + 5 ; i++ ){
        if( isAP(xData) ){
            let len: number = array.length-1;
            let add: number = array[len][0] + dif;
            let y:number = coefficient.a * add + coefficient.b;
            
            // Terminal Condition
            if( add >= 400 || add < 0 ) break;
            if( y < 0 || y > 450 ) break;
            
            array.push([add, y]);
        }else{
            let add = max + dif;
            console.log(add);
            let y:number = coefficient.a * add + coefficient.b;
            if( add >= 450 || add < 0 ) break;
            if( y < 0 || y > 450 ) break;

            array.push([add, y]);
            max += dif;
        }
    }
    
    console.table(array);
    return array;
}

export function find_maximumX(xData: number[]){
    let len: number = xData.length;
    let res: number = 0;
    for( let i = 1 ; i < len ; i++ ){
        res = max(xData[i], xData[i-1]);
    }
    return res;
}

export function max(a: number, b: number){
    if( a > b ) return a;
    else return b;
}

export function isAP( arr: number[] ){
    let len = arr.length;
    let dif = arr[1] - arr[0];
    for( let i = 1 ; i < len ; i++ ){
        if( arr[i] - arr[i-1] != dif ) return false;
    }
    return true;
}