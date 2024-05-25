  const handleFetch = async (url) => {
    try{
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error("Fetch error: ", error.message);
      return { error: error.message}
    }
  }
  
  export const fetchBookData = (isbn) => handleFetch(`https://openlibrary.org/isbn/${isbn}.json`);
  
  export const fetchAuthorData = (authorKey) => handleFetch(`https://openlibrary.org${authorKey}.json`);
  
  export const fetchCoverData = (isbn) => handleFetch(`https://covers.openlibrary.org/b/isbn/${isbn}.json`);