import React, {useState, useEffect} from 'react'

import commons from '../css/commons.module.css'
import location from '../css/location.module.css'
import MarkerImage from '../img/marker.png'

import '../../node_modules/leaflet/dist/leaflet.css'
import '../../node_modules/leaflet/dist/leaflet.js'


export default function Location() 
{
    let [lat,setLat]=useState(46.770920);
    let [lng,setLng]=useState(23.589920);
    let [locations,setLocations]=useState([]);
    let [mapToShow,setMapToShow]=useState(null);
    let [marker,setMarker]=useState(null);
    let [markerIcon,setMarkerIcon]=useState(null);

    useEffect(() => 
    {
        getLocations();
        createMap(lat,lng);

        let urlString=window.location.href;
        let url=new URL(urlString);
        let roomId=url.searchParams.get("sala_id");

        if(roomId)
        {
            fetch('http://localhost:3000/api/all/cladire/'+roomId)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                document.getElementById(location.buildingName).innerText=res.nume;
                changeMarkerLocation(res.lat,res.long);
            });
        }
    }, []);

    return(
        <div className={commons.container}>
            <h1>Locații</h1>

            <div id={location.locationInfoContainer}>
                <div id={location.locationOptionsContainer}>
                    <table id={location.table}>
                        <thead>
                            <tr>
                                <th>Locație</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyTable">
                        </tbody>
                    </table>
                </div>

                <h2 id={location.buildingName}></h2>

                <div id={location.map}></div>
            </div>
        </div>
    );

    function getLocations()
    {
        fetch('http://localhost:3000/api/all/cladiri')
        .then(res => res.json())
        .then(res => {
            locations=res;
            fillLocationsTable();
        });        
    }

    function fillLocationsTable()
    {
        let tbodyTable=document.getElementById("tbodyTable");

        for(let i=0;i<locations.length;i++)
        {
            let aux=locations[i];
            let trTable=document.createElement("tr");
            let tdLocation=document.createElement("td");

            tdLocation.innerText=locations[i].nume;
            trTable.appendChild(tdLocation);

            let lat=locations[i].lat;
            let long=locations[i].long;

            trTable.addEventListener('click',function(){
                document.getElementById(location.buildingName).innerText=aux.nume;
                changeMarkerLocation(lat,long);
            });
            tbodyTable.appendChild(trTable);
        }
    }

    function createMap(latitude,longitude)
    {
        let mapElement=document.getElementById(location.map);
        mapElement.innerHTML="";
        mapElement.style.display="inline-block";

        mapToShow = window.L.map(mapElement).setView([latitude, longitude], 13);

        markerIcon = window.L.icon({
            iconUrl: MarkerImage,
            iconSize: [38, 38],
            iconAnchor: [22, 40],
        });

        marker=window.L.marker([latitude,longitude],{icon:markerIcon});

        window.L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoicGMyMDIwIiwiYSI6ImNrNTJ5cnMwMjAyZWEzZXBneTkwOHEyMTgifQ.wE3UaPU8-YHnyn4xvMIBtQ'
        }).addTo(mapToShow);
    }

    function changeMarkerLocation(latitude,longitude)
    {
        marker.remove(mapToShow);
        marker = window.L.marker([latitude, longitude],{icon:markerIcon}).addTo(mapToShow);
    }
}