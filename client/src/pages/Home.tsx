import React from "react";
import Map from "../components/Map/Map";
import AddEvent from "../components/AddEvent/AddEvent";
import SearchForm from "../components/SearchForm/SearchForm";

export default function Home () {

    return (
        
        <div className="mainPage" style={{ 
            backgroundImage: "url(/pexels.jpeg)" 
          }}>
            <div className="bodyHome">
                <SearchForm/>
            <Map/>
            <AddEvent/>
            </div>
        </div>
    )
}