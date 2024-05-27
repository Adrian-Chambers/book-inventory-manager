
const fetchFromAPI = async (url, errorMessage) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage || 'Network error while fetching data.');
  }
};

export const fetchBookData = (isbn) => fetchFromAPI(`https://openlibrary.org/isbn/${isbn}.json`, 'Error fetching book data.');
export const fetchAuthorData = (authorKey) => fetchFromAPI(`https://openlibrary.org${authorKey}.json`, 'Error fetching author data.');
export const fetchCoverData = (isbn) => fetchFromAPI(`https://covers.openlibrary.org/b/isbn/${isbn}.json`, 'Error fetching cover data.');
