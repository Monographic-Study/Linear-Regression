import * as d3 from "d3";
import { PRE_DEALT } from "./main";

// Set Dimensions
const xSize = 500;
const ySize = 500;
const margin = 40;
const xMax = xSize - margin * 2;
const yMax = ySize - margin * 2;

export function generate_graph( pre_dealt: PRE_DEALT, coefficient: COEFFICIENT, data_length: number, predict_data: number[][] ) {
  const given_material = [];
  const predict_material= [];
  let len = predict_data.length;

  // console.table(predict_data);
  // console.log(data_length);
  
  for( let i = 0 ; i < len ; i++ ){
    if( i < data_length ) given_material.push([predict_data[i][0], (ySize-predict_data[i][1])-80]);
    else predict_material.push([predict_data[i][0], (ySize-predict_data[i][1])-80]);
  } 

  // console.table(predict_material);
  // console.table(given_material);

  display_graph( given_material, predict_material );
}

export interface PER_DEALT {
  xData: DATA,
  yData: DATA,
  r: number,
  s_xx: number,
  s_yy: number,
  s_xy: number,
}

export interface COEFFICIENT {
  a: number,
  b: number,
}

export interface DATA {
  avg: number,
  sum: number,
  value: number[],
  sigma: number,
}

export function display_graph(given: number[][], predict: number[][]) {
  // let data: number[][] = [preDealt.xData.value, preDealt.yData.value];

  // Append SVG Object to the Page
  const svg = d3.select("#myPlot")
    .append("svg")
    .append("g")
    .attr("transform","translate(" + margin + "," + margin + ")");

  // X Axis
  const x = d3.scaleLinear()
    .domain([0, xMax,])
    .range([0, xMax,]);

  svg.append("g")
    .attr("transform", "translate(0," + yMax + ")")
    .call(d3.axisBottom(x));

  // Y Axis
  const y = d3.scaleLinear()
    .domain([0, yMax,])
    .range([yMax, 0,]);

  svg.append("g")
    .call(d3.axisLeft(y));

  // Dots
  svg.append('g')
    .selectAll("dot")
    .data(given).enter()
    .append("circle")
    .attr("cx", function (d) { return d[0] } )
    .attr("cy", function (d) { return d[1] } )
    .attr("r", 3)
    .style("fill", "Red");

  // Dots
  svg.append('g')
    .selectAll("dot")
    .data(predict).enter()
    .append("circle")
    .attr("cx", function (d) { return d[0] } )
    .attr("cy", function (d) { return d[1] } )
    .attr("r", 3)
    .style("fill", "Blue");
}