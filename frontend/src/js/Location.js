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
            let coords=getInitialCoordinates(roomId);
            changeMarkerLocation(coords.lat,coords.long);
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

                <div id={location.map}>
                </div>
            </div>
        </div>
    );

    function getLocations()
    {
        locations=JSON.parse('{"locations":[{"name":"FSEGA","lat":46.773077,"long":23.620982},{"name":"Cladirea centrala","lat":46.767536,"long":23.591345},{"name":"Parcul sportiv","lat":46.763206,"long":23.560394},{"name":"Facultatea de drept","lat":46.766426,"long":23.589613}]}').locations;
        fillLocationsTable();
    }

    function fillLocationsTable()
    {
        let tbodyTable=document.getElementById("tbodyTable");

        for(let i=0;i<locations.length;i++)
        {
            let trTable=document.createElement("tr");
            let tdLocation=document.createElement("td");

            tdLocation.innerText=locations[i].name;
            trTable.appendChild(tdLocation);

            let lat=locations[i].lat;
            let long=locations[i].long;

            trTable.addEventListener('click',function(){changeMarkerLocation(lat,long)})
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

    function getInitialCoordinates(roomid)
    {
        let coords={"lat":"46.773077","long":"23.620982"};
        return coords;
    }

    function changeMarkerLocation(latitude,longitude)
    {
        marker.remove(mapToShow);
        marker = window.L.marker([latitude, longitude],{icon:markerIcon}).addTo(mapToShow);
    }
}