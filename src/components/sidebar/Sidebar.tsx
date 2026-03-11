import ChatList from "./ChatList"
import SearchInput from "./SearchInput"

interface Props{
  open:boolean
}

export default function Sidebar({open}:Props){

  return(
    <aside className={`sidebar ${open ? "open" : "closed"}`}>

      <button className="new-chat">+ Новый чат</button>

      <SearchInput />

      <ChatList />

    </aside>
  )
}