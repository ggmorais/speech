import React from 'react'
import jwtDecode from 'jwt-decode';
import config from 'config';

export const ChatContext = React.createContext();

const ChatProvider = props => {

  const token = localStorage.getItem('@speech/token');
  const user = jwtDecode(token)
  const [ rooms, setRooms ] = React.useState([]);

  const fetchRooms = async () => {
    const data = await fetch(config.api + '/rooms/' + user._id, {
      headers: {
        authorization: token
      }
    });

    const response = await data.json();
    
    setRooms(response);
  }

  React.useEffect(() => {
    // Obtain the rooms data from the API
    fetchRooms();
  }, []);

  return (
    <ChatContext.Provider value={ { user: user, rooms: rooms, token: token } }>
      { props.children }
    </ChatContext.Provider>
  );

}

export default ChatProvider;