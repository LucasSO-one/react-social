import { useContext, useRef, useState } from 'react'
import { PermMedia,Label,Room,EmojiEmotions,Cancel  } from '@mui/icons-material'
import './share.css'
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios'

export default function Share() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const desc = useRef();
    const [file,setFile] = useState(null)

    const submitHandler = async (e) =>{
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc: desc.current.value
        }  
        // uploading a file
        if(file){
            const data = new FormData();
            const fileName = Date.now()+file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try{
                await axios.post("/upload", data)
            }catch(error){
                console.log(error);
            }
        }
        try{
           await axios.post("/posts", newPost);
           window.location.reload()
        }catch(error){ }
    }

  return (
    <>
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg'  alt='shareProfileImg' src={user.profilePicture
                    ? PUBLIC_FOLDER+user.profilePicture 
                    : PUBLIC_FOLDER+"person/noAvatar.png"}></img>
                <input placeholder={'What is in your mind? '+user.username+ "?"} ref={desc} className="shareInput" />
            </div>
            <hr className="shareHr" />
            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" alt="" src={URL.createObjectURL(file)}/>
                    <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor='tomato' className='shareIcon'/>
                        <span className="shareOptionText">Video or Image</span>
                        <input style={{display:"none"}}  type='file' id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                     <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                     <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon'/>
                        <span className="shareOptionText">Locations</span>
                    </div>
                     <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className='shareButton' type='submit'>Share</button>
            </form>
        </div>
    </div>
    </>
  )
}
