import { CSV } from "./main";

export function generate_grid(array: number[][], csv: CSV) {
    let len: number = array.length;
    for( let i = 0 ; i < array.length ; i++ ){
        if( array[i][1] > 400 || array[i][1] < 0 ){
            len = i;
            break;
        }
    }

    let str = `
                <tr>
                    <td>
                        ${csv.title[0]}
                    </td>
            `;
    for( let i = 0 ; i < len ; i++ ){
            str += '<td>' + array[i][0] + '</td>';
    }
    str += `
                </tr>
                <tr>
                    <td>
                        ${csv.title[1]}
                    </td>
           `
    for( let i = 0 ; i < len ; i++ ){
        str += '<td>' + array[i][1] + '</td>';
    }
    str += `</tr>`;
    let grid = document.getElementById('myGrid')!;
    grid.innerHTML = str;
}