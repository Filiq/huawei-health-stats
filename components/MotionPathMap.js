import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

export default function MotionPathMap({ pathCoords }) {
  const mapContainerRef = useRef();

  useEffect(() => {
    if (pathCoords.length === 0) return;
    if (!pathCoords[0]?.lon) return;

    const style = {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          maxzoom: 19,
        },
      },
      layers: [
        {
          id: "osm",
          type: "raster",
          source: "osm", // This must match the source key above
        },
      ],
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style,
      center: [pathCoords[0].lon, pathCoords[0].lat],
      zoom: 14,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    var draw = new MapboxDraw({
      styles: [
        {
          id: "gl-draw-line-inactive",
          type: "line",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "LineString"],
            ["!=", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#ff0000",
            "line-width": 2,
          },
        },
      ],
    });

    map.addControl(draw, "top-left");

    pathCoords.pop();

    draw.add({
      type: "LineString",
      coordinates: pathCoords.map((coord) => [coord.lon, coord.lat]),
    });

    const startDiv = document.createElement("div");
    startDiv.style.width = "2rem";
    const startImg = new Image();
    startImg.src = "/start.png";

    startDiv.appendChild(startImg);

    const endDiv = document.createElement("div");
    endDiv.style.width = "2rem";
    const endImg = new Image();
    endImg.src = "/stop.png";

    endDiv.appendChild(endImg);

    new maplibregl.Marker(startDiv)
      .setLngLat([pathCoords[0]?.lon, pathCoords[0]?.lat])
      .addTo(map);

    new maplibregl.Marker(endDiv)
      .setLngLat([
        pathCoords[pathCoords.length - 1].lon,
        pathCoords[pathCoords.length - 1].lat,
      ])
      .addTo(map);

    document.querySelector(".mapbox-gl-draw_line").remove();
    document.querySelector(".mapbox-gl-draw_polygon").remove();
    document.querySelector(".mapbox-gl-draw_point").remove();
    document.querySelector(".mapbox-gl-draw_trash").remove();
    document.querySelector(".mapbox-gl-draw_combine").remove();
    document.querySelector(".mapbox-gl-draw_uncombine").remove();

    return () => {
      map.remove();
    };
  });

  return (
    <div className="h-[44rem]">
      {pathCoords.length !== 0 && (
        <div ref={mapContainerRef} className="w-full h-full" />
      )}
    </div>
  );
}
