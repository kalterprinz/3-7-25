import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from "axios";
import iliganData from './iliganmap.json';
import "./all.css";
import "./OfficerDash.css";
import "leaflet/dist/leaflet.css";

const OfficerMap = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [officers, setOfficers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await axios.get("http://192.168.1.32:3001/getOfficer");
        const data = response.data;
        
        console.log("API Response:", data); // Debugging line
  
        const filteredOfficers = data.filter(officer => {
          console.log("Officer Barangay:", officer.barangay); // Check barangay field
          return officer.dutyStatus === "On Duty" && 
                 officer.role !== "Admin" && 
                 officer.role !== "Treasurer";
        });
  
        console.log("Filtered Officers:", filteredOfficers);
  
        setOfficers(filteredOfficers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching officers: ", error);
      }
    };
  
    fetchOfficers();
  }, []);
  
  const normalizeBarangayName = (name) => {
    return name.toLowerCase().replace(/[-\s]/g, ""); 
  };
  
  const getOfficersByBarangay = (barangayName) => {
    if (!barangayName) return "";
  
    return officers
      .filter(officer => 
        officer.assign &&
        normalizeBarangayName(officer.assign) === normalizeBarangayName(barangayName)
      )
      .map(officer => officer.name)
      .join("<br>"); // Use <br> for HTML line breaks
  };
  

  const styleFeature = (feature) => {
    const barangayName = feature.properties.adm4_en ? feature.properties.adm4_en.toUpperCase() : "";
    const assignedOfficers = getOfficersByBarangay(barangayName);
  
    return {
      weight: 2,
      color: 'black',
      fillOpacity: 0.5, // Keep some visibility
      fillColor: assignedOfficers ? 'green' : 'lightgray' // Light gray when no officers are present
    };
  };

  const onEachFeature = (feature, layer) => {
    const barangayName = feature.properties.adm4_en ? feature.properties.adm4_en.toUpperCase() : "";
    const assignedOfficers = getOfficersByBarangay(barangayName);
  
    layer.bindTooltip(
      `<strong>${feature.properties.adm4_en}</strong><br>Officers:<br>${assignedOfficers || "None"}`,
      { direction: "center", className: "custom-tooltip", permanent: false }
    );
  };

  return (
        <div>
          <div className="map-container"> 
            <div className="map-title-container">
              <h1 className="map-title">Traffic Officers Map</h1>
              <p className="map-descriptionof">
                This map displays the deployment of traffic officers across Iligan City. Hover over a barangay to see assigned officers.
              </p>
            </div>
            <MapContainer center={[8.236, 124.258]} zoom={12.5} className="leaflet-container13">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
              />
              {!isLoading && (
                <GeoJSON
                  data={iliganData}
                  style={styleFeature}
                  onEachFeature={onEachFeature}
                />
              )}
            </MapContainer>
            <div className="map-footer">
              <p>
                Use this map to monitor traffic officers' deployment in various barangays. It provides an overview of assigned locations to ensure effective traffic management.
              </p>
            </div>
          </div>
        </div>
  );
};

export default OfficerMap;
