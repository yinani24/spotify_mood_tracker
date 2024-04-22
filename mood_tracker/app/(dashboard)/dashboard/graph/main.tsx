"use client"
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function CreateGraph(){
  const chartRef = useRef(null);
  const data: DataPoint[] = [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 15 },
      { x: 3, y: 25 }
  ];
  useEffect(() => {
      if (chartRef.current && data.length > 0) {
          const svg = d3.select(chartRef.current);
          const width = 500;
          const height = 300;

          // Define scales
            const x = d3.scaleLinear().range([0, width]);
            const y = d3.scaleLinear().range([height, 0]);

            // Define line generator
            const line = d3
              .line<DataPoint>()
              .x((d) => x(d.x))
              .y((d) => y(d.y))

            // Set domain for scales
            x.domain([0,1,2,3 ]);
            y.domain([10, 15, 20, 25]);

            // Render the line chart
            svg.selectAll("*").remove(); // Clear previous content
          svg.attr("width", width)
              .attr("height", height)
              .append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 1.5)
              .attr("d", line);
      }
  }, [data]);

  return <svg ref={chartRef} />;
}

interface DataPoint {
    x: number;
    y: number;
}
