"use client";
import Image from "next/image";
import { services } from "./assistance.data";
import "./assistance.scss";
export default function Assistance() {
  return (
    <div id="service-content">
      {services.map((service, key) => (
        <div id="service" key={key}>
          <div style={{ position: "relative", width: 200, height: 200 }}>
            <Image src={service.img} fill alt="" />
          </div>
          <p>{service.title}</p>
        </div>
      ))}
    </div>
  );
}
