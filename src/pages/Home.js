import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <VerticalCardProduct category={"Walkie Talkies and Communication Devices"} heading={"Walkie Talkies and Communication Devices"} />
      <VerticalCardProduct category={"Security and Suveillance Cameras"} heading={"Security and Suveillance Cameras"} />
      <VerticalCardProduct category={"Ring Lights & LED Lights"} heading={"Ring Lights & LED Lights"} />
      <VerticalCardProduct category={"Photography and Camera Accessories"} heading={"Photography and Camera Accessories"} />
      <VerticalCardProduct category={"Tripod Stands"} heading={"Tripod Stands"} />
      <HorizontalCardProduct category={"airpods"} heading={"Top Airpods, Headphones and Earphones"} />
      <VerticalCardProduct category={"Microphones"} heading={"Microphones"} />
      <HorizontalCardProduct category={"watches"} heading={"Smart Watches"} />
      <VerticalCardProduct category={"Wall Clocks and Stop Watches"} heading={"Wall Clocks and Stop Watches"} />
      <VerticalCardProduct category={"Sun Glasses and Bluetooth Devices"} heading={"Sun Glasses and Bluetooth Devices"} />
      <VerticalCardProduct category={"Other Electronics"} heading={"Other Electronics"} />
      <VerticalCardProduct category={"Hybrid Cars Parts"} heading={"Hybrid Cars Parts"} />

      <VerticalCardProduct category={"Car Accessories"} heading={"Car Accessories"} />

      <VerticalCardProduct category={"Vehicles"} heading={"Vehicles"} />
      <VerticalCardProduct category={"Home Decor"} heading={"Home Decor"} />

      <VerticalCardProduct category={"Beauty Products"} heading={"Beauty Products"} />


    </div>
  )
}

export default Home