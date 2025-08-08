import './sidebar.css'
import { RssFeed , Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,} from '@mui/icons-material'

import {Users} from '../../dummyData'
import CloseFriend from '../closeFriend/CloseFriend'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
              <RssFeed className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Feed</a>
          </li>
          <li className="sidebarListItem">
              <Chat className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Chats</a>
          </li>
          <li className="sidebarListItem">
              <PlayCircleFilledOutlined className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Videos</a>
          </li>
          <li className="sidebarListItem">
              <Group className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Groups</a>
          </li>
          <li className="sidebarListItem">
              <Bookmark className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Bookmarks</a>
          </li>
          <li className="sidebarListItem">
              <HelpOutline className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Questions</a>
          </li>
          <li className="sidebarListItem">
              <WorkOutline className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Jobs</a>
          </li>
          <li className="sidebarListItem">
              <Event className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Events</a>
          </li>
          <li className="sidebarListItem">
              <School className='sidebarIcon'/>
              <a href="#" className="sidebarListItemText">Courses</a>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr'/>
        <ul className="sidebarFriendList">
            {Users.map(u => (
              <CloseFriend key={u.id} user={u}/>
            ))}
         
        </ul>
      </div>
    </div>
  )
}
