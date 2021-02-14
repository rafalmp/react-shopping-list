import React from 'react';

export const ListsContext = React.createContext();

async function fetchData(dataSource) {
  try {
    const data = await fetch(dataSource);
    const dataJSON = await data.json();
    if (dataJSON) {
      return await ({ data: dataJSON, error: false });
    }
  } catch(error) {
    return ({ data: false, error: error.message });
  }
}

const ListsContextProvider = ({ children }) => {
  const [lists, setLists] = React.useState([]);
  React.useEffect(() => {
    const asyncFetchData = async dataSource => {
      const result = await fetchData(dataSource);
      setLists([...result.data]);
    };
    asyncFetchData('https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists').then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, setLists]);

  return (
    <ListsContext.Provider value={{ lists }}>
      {children}
    </ListsContext.Provider>
  )
};

export default ListsContextProvider;
