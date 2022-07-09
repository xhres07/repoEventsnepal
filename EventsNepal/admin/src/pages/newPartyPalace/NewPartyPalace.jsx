import "./newPartyPalace.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { partyPalaceInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";


const NewPartyPalace = ({ }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [venues, setVenues] = useState([]);

  const { data, loading, error } = useFetch("/venues")

  const handleChange = e =>{
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleSelect = e=>{
    const value = Array.from(e.target.selectedOptions, (option)=>option.value)
    setVenues(value)
  }

  console.log(files)

  const handleClick = async e=>{
    e.preventDefault()
    try{
      const list = await Promise.all(Object.values(files).map( async (file)=>{
        const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dxqsoew69/image/upload",
            data
          );
    
          const {url} = uploadRes.data
          return url
      }))

      const newpartyPalace = {
        ...info,venues,photos:list,
      }

      await axios.post("/partyPalaces", newpartyPalace)
    }catch(err){}
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New PartyPalace</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {partyPalaceInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} 
                  onChange={handleChange} 
                  type={input.type} 
                  placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput" >
                  <label>Featured</label>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className="selectVenues" >
                  <label>Menues</label>
                  <select id="venues" multiple onChange={handleSelect}>
                    {loading ? "loading" : data && data.map(venue=>(
                      <option key={venue._id} value={venue._id}>{venue.title}</option>
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

export default NewPartyPalace;
