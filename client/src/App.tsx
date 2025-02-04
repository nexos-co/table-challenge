import { useState } from "react";
import CatGallery from "./components/CatGallery";
import Home from "./components/Home";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  function navigate(route: string) {
    return setActiveTab(route);
  }

  if (activeTab === 'home') return <Home navigate={navigate} />

  if (activeTab === 'catGallery') return <CatGallery />

  return <></>

}