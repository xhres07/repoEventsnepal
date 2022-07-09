import "./newVenue.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { venueInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewVenue = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [partyPalaceId, setPartyPalaceId] = useState(undefined);
  const [venues, setVenues] = useState([]);

  const { data, loading, error } = useFetch("/partyPalaces")

  const handleChange = e =>{
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) =>{
    e.preventDefault()
    const menue = venues.split(",").map((venue) => ({ menue: venue }))
    try{
      await axios.post(`/venues/${partyPalaceId}`, {...info,menue})
    }catch(err){console.log(err)}
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Venue</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
            
              {venueInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder}
                  onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                  <label>Venues</label>
                  <textarea onChange={e=>setVenues(e.target.value)} placeholder="Give comma between Menue"/>
                </div>
              <div className="formInput" >
                  <label>Choose a PartyPalace</label>
                  <select id="partyPalaceId" onChange={(e) => setPartyPalaceId(e.target.value)}>
                    {loading ? "loading" : data && data.map(partyPalace=>(
                      <option key={partyPalace._id} value={partyPalace._id}>{partyPalace.name}</option>
                    ))}
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVenue;
