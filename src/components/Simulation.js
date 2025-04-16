import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access URL params
import "./Game.css";
import Driverheader from "./Driverheader";

const Simulation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tid = queryParams.get("data-tid");
  return (
    <div>
      <Driverheader />
      <div className="elearning-container5">
        <div className="page-header">
          <h1>Simulation</h1>
          <p>Start your Simulation here! Choose which Simulation you want to play.</p>
        </div>
        <div className="game-container">
          {tid === "1099" && (
            <>
              <h2 className="gametitle">Distracted Driving Simulation</h2>
              <div className="material-card1">
              <iframe
                  src="https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html"
                  width="100%" 
                  height="600px" 
                  style={{ border: 'none', margin: '0 auto' }}
                  title="Highway Traffic Game"
                ></iframe>
              </div>
            </>
          )}
          {tid === "1100" && (
            <>
              <h2 className="gametitle">Drinking and Driving Simulation</h2>
              <div className="material-card1">
              <iframe
                src="https://www.onlinegames.io/games/2021/unity/dockyard-tank-parking/index.html"
                width="100%" 
                height="600px" 
                style={{ border: 'none', margin: '0 auto' }}
                title="Dockyard Tank Parking"
              ></iframe>
              </div>
            </>
          )}
          {tid === "1101" && (
            <>
              <h2 className="gametitle">Road Signs Simulation</h2>
              <div className="material-card1">
                <iframe 
                  src="https://www.jopi.com/embed.php?game=extreme-car-parking" 
                  width="100%" 
                  height="600px" 
                  style={{ border: 'none', margin: '0 auto' }}
                  title="Extreme Car Parking"
                  ></iframe>

              </div>
            </>
          )}
          {tid === "1104" && (
            <>
              <h2 className="gametitle">Cross Road Exit</h2>
              <div className="material-card1">
                <iframe 
                  src="https://www.jopi.com/embed.php?game=cross-road-exit"
                  width="100%" 
                  height="600px" 
                  style={{ border: 'none', margin: '0 auto' }}
                  title="Cross Road Exit"
                  ></iframe>

              </div>
            </>
          )}
           {tid === "1105" && (
            <>
              <h2 className="gametitle">Traffic Go</h2>
              <div className="material-card1">
                <iframe 
                  src="https://www.jopi.com/embed.php?game=traffic-go" 
                  width="100%" 
                  height="600px" 
                  style={{ border: 'none', margin: '0 auto' }}
                  title="Traffic Go"
                  ></iframe>

              </div>
            </>
          )}
          
          {!tid && <p>Please select a Simulation from the e-learning materials page.</p>}
        </div>
      </div>
    </div>
  );
};

export default Simulation;
