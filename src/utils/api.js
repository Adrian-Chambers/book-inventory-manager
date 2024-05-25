export const fetchBookData = async (isbn) => {
    const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    return response.json();
  };
  
  export const fetchAuthorData = async (authorKey) => {
    const response = await fetch(`https://openlibrary.org${authorKey}.json`);
    return response.json();
  };
  
  export const fetchCoverData = async (isbn) => {
    const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}.json`)
    return response.json();
}