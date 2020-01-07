import React from 'react'
import jwtDecode from 'jwt-decode';
import config from 'config';

export const ChatContext = React.createContext();

const ChatProvider = props => {

  const token = localStorage.getItem('@speech/token');

  const [ user, setUser ] = React.useState({});
  const [ rooms, setRooms ] = React.useState([]);

  const fetchRooms = async () => {
    const data = await fetch(config.api + '/rooms', {
      headers: {
        authorization: token
      }
    });

    const response = await data.json();
    
    setRooms(response);
  }

  React.useEffect(() => {
    // Authenticated user information
    setUser(jwtDecode(token))

    // Obtain the rooms data from the API
    fetchRooms();
  }, []);

  return (
    <ChatContext.Provider value={ { user: user, rooms: rooms } }>
      { props.children }
    </ChatContext.Provider>
  );

}

export default ChatProvider;