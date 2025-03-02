const fetchBookImage = async (title, isbn = null) => {
  try {
    const googleApiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    const isbnDbApiKey = import.meta.env.VITE_ISBNDB_API_KEY;

    if (!googleApiKey) throw new Error("Google Books API key is missing");

   
    const cachedImage = localStorage.getItem(`book-image-${title}`);
    if (cachedImage) return cachedImage;

    let imageUrl = null;

   
    if (isbn && isbnDbApiKey) {
      try {
        const isbnDbResponse = await fetch(
          `https://api2.isbndb.com/book/${isbn}`,
          { headers: { Authorization: isbnDbApiKey } }
        );
        const isbnDbData = await isbnDbResponse.json();

        if (isbnDbData.book && isbnDbData.book.image) {
          imageUrl = isbnDbData.book.image;
        }
      } catch (error) {
        console.warn("ISBNdb API failed, trying other sources.");
      }
    }


    if (!imageUrl && isbn) {
      imageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    }

   
    if (!imageUrl) {
      const googleResponse = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&maxResults=1&key=${googleApiKey}`
      );
      const googleData = await googleResponse.json();

      if (googleData.items && googleData.items.length > 0) {
        const bookInfo = googleData.items[0].volumeInfo;
        if (bookInfo.imageLinks) {
          imageUrl = bookInfo.imageLinks.extraLarge ||
                     bookInfo.imageLinks.large || 
                     bookInfo.imageLinks.medium || 
                     bookInfo.imageLinks.thumbnail;
        }
      }
    }

    
    if (!imageUrl) {
      imageUrl = "/default-cover.jpg";
    }

 
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = resolve;
      img.onerror = reject;
    });

  
    localStorage.setItem(`book-image-${title}`, imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error fetching book image:", error);
    return "/default-cover.jpg";
  }
};

export default fetchBookImage;
