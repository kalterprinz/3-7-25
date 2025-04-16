import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import iciT from './iciT.png';
import car2 from "./police.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faIdCard, faRectangleList, faCircleXmark, faCircleUser, faGamepad, faCircleInfo, faStar  } from '@fortawesome/free-solid-svg-icons';
import Driverheader from './Driverheader';
import './DriverDash.css';
import './LandingPage.css';
import './loader.css';

const LandingPage = () => {

const [loggedIn, setLoggedIn] = useState(false);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {
    const checkAuthentication = async () => {
      const driverId = localStorage.getItem('driverId');

      if (driverId) {
        // Check if driverId exists in the drivers' database
        const driverResponse = await fetch(`http://192.168.43.245:3001/getDriverById2/${driverId}`);
        if (driverResponse.ok) {
            console.log(`Driver found with id ${driverId}.`);
          
          return;
        }

        // If not found in drivers, check in officers' database
        const officerResponse = await fetch(`http://192.168.43.245:3001/getOfficerById/${driverId}`);
        if (officerResponse.ok) {
          const officerData = await officerResponse.json();
          // Navigate based on officer's role
          if (officerData.role === 'Admin') {
            console.log(`Admin found with id ${driverId}.`);
            navigate('/adminDashboard');
          } else if (officerData.role === 'Officer') {
            console.log(`Officer found with id ${driverId}.`);
            navigate('/officerDashboard');
          } else {
            // Role not recognized; remove driverId and navigate to home
            localStorage.removeItem('driverId');
            navigate('/');
          }
          return;
        }
      }

      // If driverId is not found in either database
      localStorage.removeItem('driverId');
      navigate('/');
    };

    checkAuthentication();
  }, [navigate]);

// Simulating a delay for loading
useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 3000); // Adjust the time as needed (3000ms = 3 seconds)
}, []);

// Declare the modal state and data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalText, setModalText] = useState("");
// Function to open the modal
const openModal = (image, description, text) => {
    setModalImage(image);
    setModalDescription(description);
    setModalText(text);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
    setModalDescription("");
    setModalText("");
  };
  
    // Refs for sections
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);

  // Scroll to the section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // contact us
  const contactInfo = [
    {
      agency: 'LTO (Land Transportation Office)',
      phone: '(063) 221-7691',
      email: 'ltombox@lto.gov.ph',
      location: 'Rosario Heights, Iligan City, Lanao del Norte',
    },
    {
      agency: 'ICTPMO (Iligan City Traffic and Parking Management Office)',
      phone: '(063) 221-4329 / (063) 222-6275',
      email: 'iligancitytraffic2022@gmail.com',
      location: 'IBJT Tambo Terminal, Hinaplanon, Iligan City, Lanao Del Norte, Iligan City',
    },
    {
      agency: 'CTO (City Treasurer\'s Office)',
      phone: '(063) 221-4343',
      email: 'citytreasurer@iligancity.gov.ph',
      location: 'City Hall Building, Empire Village Street, Iligan City, Lanao Del Norte',
    },
    {
      agency: 'PNP (Philippine National Police)',
      phone: '(063) 223 9836',
      email: 'iligancpopcru@gmail.com',
      location: 'IBJT Tambo Terminal, Hinaplanon, Iligan City, Lanao Del Norte, Iligan City',
    }
  ];


  return (
    <div className="landing-page">
        {/* Show loading overlay if loading is true */}
            {loading ? (
                <div class="loading-container">
                <div class="carAnimation">
                  <div class="road"></div>
                  <div class="car">
                    <div class="colour"></div>
                    <div class="windows"></div>
                    <div class="leftWheel">
                      <div class="wheel"></div>
                    </div>
                    <div class="rightWheel">
                      <div class="wheel"></div>
                    </div>
                  </div>
                  <div class="clouds"></div>
                </div>
              </div>
            ) : (
                <>
                {/* Header */}
                <header className={localStorage.getItem("driverId") ? "headerdriver" : "headerlan"}>
                <div className={localStorage.getItem("driverId") ? "logoheader" : "logoheader1"}>
                    <img src={iciT} alt="Logo" />
                </div>
                <h4 className="titlel1">ILIGAN CITATION TICKET ONLINE</h4>
                <nav className={localStorage.getItem("driverId") ? "nav" : "navlan"}>
                    {localStorage.getItem("driverId") ? (
                    <>
                    <div class="buton">
                        <a href="/">Home<FontAwesomeIcon icon={faHouse} style={{ marginLeft: "5px" }} /></a>
                        <a href="/Game">Game <FontAwesomeIcon icon={faGamepad} style={{ marginLeft: "5px" }} /></a>
                        <a href="/DriverDashboard">Profile<FontAwesomeIcon icon={faCircleUser} style={{ marginLeft: "5px" }} /></a>
                        |
                        <button className="logoutBtn" onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("driverId");
                        window.location.reload();
                        }}>
                        Logout
                        </button>
                        </div>
                    </>
                    ) : (
                    <>
                        <button onClick={() => scrollToSection(aboutRef)}>About <FontAwesomeIcon icon={faCircleInfo} style={{marginLeft:"5"}}  /></button>
                        <button onClick={() => scrollToSection(featuresRef)}>Features <FontAwesomeIcon icon={faStar} style={{marginLeft:"5"}}  /></button>
                        <button> <a href="Game" style={{ marginRight:"15px", color:"#05223e", fontWeight:"bold"}}>Game <FontAwesomeIcon icon={faGamepad} style={{marginLeft:"5", color:"#05223e"}}  /></a></button>
                        <a href="/login" className="login-button">Login</a>
                    </>
                    )}
                </nav>
                </header>

                {/* Hero Section */}
                <section className="hero">
                {localStorage.getItem("driverId") ? (
                        <>
                        <h1>Welcome, Driver!</h1>
                        <p>
                            Access your traffic violation records, compliance score, and payment options all in one place with iciTicket.
                        </p>
                        </>
                    ) : (
                        <>
                        <h1>Streamlining Traffic Violation Management with Ease and Transparency!</h1>
                        <p>Manage traffic violations effortlessly with iciTicket's digital citation system.</p>
                        <a href="/login" className="cta-button">Login to Your Account</a>
                        </>
                    )}
                    
                </section>

                {/* About Section */}
                <section id="about" ref={aboutRef} className="about">
                <div className="about-container">
                        <div className="about-row">
                            <div className="about-text">
                                <div className="text-section">
                                  <h2>About</h2>
                                    <p>
                                    <strong>iciTicket</strong> is a comprehensive traffic violation management system designed to streamline the way traffic citations are issued, managed, and resolved. 
                                    It empowers administrators to oversee operations, track officer activity, and generate detailed reports. 
                                    <ul>
                                        <li>
                                            <strong>Officers</strong> benefit from tools to add violations, generate digital e-citation tickets, and maintain organized records of apprehended drivers. 
                                        </li>
                                        <li>
                                            <strong>Drivers</strong> can easily access their violation history, pay fines, and display their personal QR code for quick identification.

                                        </li>
                                    </ul>
                                    By digitizing the traffic management process, iciTicket enhances transparency, reduces paperwork, and fosters accountability for all users. 
                                    Our mission is to create a seamless and efficient system that promotes safer roads and better compliance with traffic regulations.
                                    </p>
                                </div>
                                <div className="image-section">
                                    <img src={car2} alt="Traffic Management System" className="banner1" />
                                </div>
                            </div>
                        </div>

                        {/* Slideshow and Cards Section */}
                        <div className="about-text">
                            <div className="left-section">
                            {/* Slideshow Carousel */}
                            <Carousel
                                showArrows={true}
                                infiniteLoop={true}
                                showThumbs={false}
                                showStatus={false}
                                autoPlay={true}
                                interval={3000}
                            >
                                <div>
                                <img src="/photo1.jpg" alt="Traffic Management" />
                                </div>
                                <div>
                                <img src="/photo2.jpg" alt="Parking Management" />
                                </div>
                                <div>
                                <img src="/photo3.jpg" alt="Urban Mobility" />
                                </div>
                            </Carousel>
                            </div>

                            <div className="right-section">
                                <div className="about-box-container">
                                    {/* Card 1 */}
                                    <div
                                        className="about-box"
                                        onClick={() =>
                                            openModal(
                                            "/ictpmo.jpg",
                                            "Iligan City Traffic and Parking Management",
                                            "The Iligan City Traffic and Parking Management Office (ICTPMO) plays a crucial role in ensuring smooth traffic flow and parking management within the city. Through the use of advanced technologies, ICTPMO monitors traffic violations, enforces parking regulations, and manages the issuance of tickets electronically. The office focuses on creating a safer, more organized environment for residents and visitors by facilitating efficient traffic management and streamlining enforcement processes."
                                            )
                                        }
                                        >
                                        <div className="image-container">
                                            <img src="/ictpmo.jpg" alt="ICTPMO" />
                                        </div>
                                        <div className="card-content">
                                            <p className="box-title">
                                            Iligan City Traffic and Parking Management
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div
                                        className="about-box"
                                        onClick={() =>
                                            openModal(
                                            "/lto.png",
                                            "Land Transportation Office",
                                            "The Land Transportation Office (LTO) E-Ticketing System provides a modern and efficient method for managing traffic-related violations. It offers quick issuance of tickets and digital record-keeping for better law enforcement. This system enhances the efficiency of traffic regulation by allowing authorities to issue tickets on the spot, reducing manual paperwork and ensuring accurate tracking of violations."
                                            )
                                        }
                                        >
                                        <div className="image-container">
                                            <img src="/lto.png" alt="LTO" />
                                        </div>
                                        <div className="card-content">
                                            <p className="box-title">Land Transportation Office</p>
                                        </div>
                                    </div>

                                    {/* Card 3 */}
                                    <div
                                        className="about-box"
                                        onClick={() =>
                                            openModal(
                                            "/npa.png",
                                            "Philippine National Police",
                                            "The Philippine National Police (PNP) is the national law enforcement agency responsible for maintaining peace and order. The E-Ticketing System provides the PNP with a powerful digital tool for monitoring and managing traffic-related incidents, enabling efficient issuance of digital tickets and better law enforcement transparency."
                                            )
                                        }
                                        >
                                        <div className="image-container">
                                            <img src="/npa.png" alt="PNP" />
                                        </div>
                                        <div className="card-content">
                                            <p className="box-title">Philippine National Police</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal */}
                        {isModalOpen && (
                            <div className="modal1" onClick={closeModal}>
                            <div
                                className="modal-content1"
                                onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
                            >
                                {/* Close Button */}
                                <button className="close-btn1" onClick={closeModal}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                                </button>

                                {/* Modal Image */}
                                {modalImage && (
                                <img src={modalImage} alt="Modal Content" className="modal-image1" />
                                )}

                                {/* Modal Description */}
                                <div className="modal-description1">
                                <h3>{modalDescription}</h3>
                                <p>{modalText}</p>
                                </div>
                            </div>
                            </div>
                        )}
                        </div>


                </section>

                {/* Features Section */}
                <section id="features" ref={featuresRef} className="features">
                    <h2>Key Features</h2>
                    <div className="section-divider"></div>
                    <div className="features-grid">
                    <div className="feature-card">
                        <img src="/admin.png" alt="PNP" />  
                        <h3>For Admins</h3>
                        <p>Manage officers and drivers records, track officer designation, track payment status and view comprehensive reports.</p>
                    </div>
                    <div className="feature-card">
                        <img src="/officer.png" alt="PNP" />  
                        <h3>For Officers</h3>
                        <p>Add violations, generate e-citation tickets, and manage records.</p>
                    </div>
                    <div className="feature-card">
                        <img src="/driver.png" alt="PNP" />  
                        <h3>For Drivers</h3>
                        <p>View violations, pay fines, and display your personal QR code.</p>
                    </div>
                    </div>
                </section>
                
                {/* Fines Section */}
                <section id="feat" ref={featuresRef} className="feat">
                    <h2>Violation Fines and other charges</h2>
                    <div className="feat-intro">
                      <p style={{marginTop:"0px"}}>
                        Below is a summary of common traffic violations and their corresponding fines, categorized based on the issuing agency. These fines are implemented to promote road safety and discipline among drivers and pedestrians.
                      </p>
                      <p className="feat-source">
                        <strong>Source:</strong> LTO Official Fines Matrix (<a href="https://portal.lto.gov.ph/ords/f?p=ELEARNING:HOME:111737969208391:::HOME:P1_ELEARN_TOPICS_FK:A9EDD4DC2A27AB72E0530D28780ACC4D" target="_blank" rel="noopener noreferrer">lto.gov.ph</a>), Iligan City Traffic Code (City Ordinance No. 02-4256), and PNP local enforcement guidelines.
                      </p>

                    </div>
                    <div className="section-divider"></div>
                    <div className="feat-grid">
                    {/* LTO Section */}
                    <div className="feat-card1">
                      <h3>LTO</h3>
                      <ul>
                        <li><span>FAILURE TO CARRY OR/CR</span><span>₱150</span></li>
                        <li><span>EXPIRED OR/CR</span><span>₱450</span></li>
                        <li><span>NO LOADING/UNLOADING</span><span>₱100</span></li>
                        <li><span>OBSTRUCTION TO SIDEWALK</span><span>₱500</span></li>
                        <li><span>UNREGISTERED/DELINQUENT/SUSPENDED VEHICLE</span><span>₱2000</span></li>
                        <li><span>DRIVING WITHOUT DRIVER'S LICENSE</span><span>₱150</span></li>
                        <li><span>EXPIRED DRIVER'S LICENSE</span><span>₱300</span></li>
                        <li><span>DRIVING UNDER THE INFLUENCE OF LIQUOR/DRUGS</span><span>₱4000</span></li>
                        <li><span>JAYWALKING</span><span>₱300</span></li>
                        <li><span>OVER SPEEDING</span><span>₱1000</span></li>
                        <li><span>NO HELMET/NON-WEARING OF CRASH HELMET</span><span>₱150</span></li>
                        <li><span>FAILURE TO OBEY TRAFFIC LIGHTS/ENFORCERS</span><span>₱150</span></li>
                        <li><span>PARKING ON THE SIDEWALK</span><span>₱500</span></li>
                        <li><span>SMOKING INSIDE PUV</span><span>₱1500</span></li>
                        <li><span>WEARING OF SLIPPERS AND SANDO</span><span>₱150</span></li>
                        <li><span>DRIVING WITH INVALID/DELINQUENT LICENSE</span><span>₱300</span></li>
                        <li><span>INVALID/NO FRANCHISE (COLORUM)</span><span>₱1000</span></li>
                        <li><span>RECKLESS DRIVING</span><span>₱150</span></li>
                        <li><span>CONTRACTING</span><span>₱2000</span></li>
                        <li><span>NO PLATE NUMBER</span><span>₱375</span></li>
                        <li><span>TRIP CUTTING</span><span>₱1000</span></li>
                      </ul>
                    </div>

                    {/* ICTPMO Section */}
                    <div className="feat-card1">
                      <h3>ICTPMO & PNP</h3>
                      <ul>
                        <li><span>FAILURE TO CARRY OR/CR</span><span>₱500</span></li>
                        <li><span>EXPIRED OR/CR</span><span>₱1000</span></li>
                        <li><span>NO LOADING/UNLOADING</span><span>₱100</span></li>
                        <li><span>OBSTRUCTION TO SIDEWALK</span><span>₱500</span></li>
                        <li><span>UNREGISTERED/DELINQUENT/SUSPENDED VEHICLE</span><span>₱2000</span></li>
                        <li><span>DRIVING WITHOUT DRIVER'S LICENSE</span><span>₱1500</span></li>
                        <li><span>EXPIRED DRIVER'S LICENSE</span><span>₱3000</span></li>
                        <li><span>DRIVING UNDER INFLUENCE</span><span>₱4000</span></li>
                        <li><span>JAYWALKING</span><span>₱300</span></li>
                        <li><span>OVER SPEEDING</span><span>₱1000</span></li>
                        <li><span>NO HELMET</span><span>₱500</span></li>
                        <li><span>FAILURE TO OBEY TRAFFIC LIGHTS/ENFORCERS</span><span>₱1000</span></li>
                        <li><span>PARKING ON THE SIDEWALK</span><span>₱500</span></li>
                        <li><span>SMOKING INSIDE PUV</span><span>₱1500</span></li>
                        <li><span>WEARING OF SLIPPERS AND SANDO</span><span>₱150</span></li>
                        <li><span>INVALID/DELINQUENT LICENSE</span><span>₱3000</span></li>
                        <li><span>NO FRANCHISE (COLORUM)</span><span>₱5000</span></li>
                        <li><span>RECKLESS DRIVING</span><span>₱2000</span></li>
                        <li><span>CONTRACTING</span><span>₱2000</span></li>
                        <li><span>NO PLATE NUMBER</span><span>₱2000</span></li>
                        <li><span>TRIP CUTTING</span><span>₱500</span></li>
                      </ul>
                    </div>
                  </div>

                </section>

                {/* Footer Section */}
                <footer className="footer">
                <div className="contact-info">
                    {contactInfo.map((agency, index) => (
                    <div key={index} className="contact-column">
                        <p><strong>{agency.agency}</strong></p>
                        <p>{agency.phone}</p>
                        <p><a href={`mailto:${agency.email}`}>{agency.email}</a></p>
                        <p>{agency.location}</p>
                    </div>
                    ))}
                </div>
                </footer>
                </>
             )}
    </div>
  );
};

export default LandingPage;
