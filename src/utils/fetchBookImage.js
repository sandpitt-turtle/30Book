const fetchBookImage = async (title, isbn = null) => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      throw new Error("Google Books API key is missing");
    }

    // Check local storage cache
    const cachedImage = localStorage.getItem(`book-image-${title}`);
    if (cachedImage) return cachedImage;

    let imageUrl = null;

    /** ────── 1️⃣ Amazon API (Best Quality) ────── **/
    if (isbn) {
      imageUrl = `https://images-na.ssl-images-amazon.com/images/P/${isbn}.jpg`;
    }

    /** ────── 2️⃣ Barnes & Noble (Alternative to Amazon) ────── **/
    if (!imageUrl && isbn) {
      imageUrl = `https://prodimage.images-bn.com/pimages/${isbn}.jpg`;
    }

    /** ────── 3️⃣ Google Books API (Fallback) ────── **/
    if (!imageUrl) {
      const googleResponse = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&maxResults=1&key=${apiKey}`
      );
      const googleData = await googleResponse.json();

      if (googleData.items && googleData.items.length > 0) {
        const bookInfo = googleData.items[0].volumeInfo;
        if (bookInfo.imageLinks) {
          imageUrl = bookInfo.imageLinks.large || 
                     bookInfo.imageLinks.medium || 
                     bookInfo.imageLinks.thumbnail;
        }
      }
    }

    /** ────── 4️⃣ Open Library API (Backup Option) ────── **/
    if (!imageUrl) {
      const openLibraryResponse = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
      );
      const openLibraryData = await openLibraryResponse.json();

      if (openLibraryData.docs && openLibraryData.docs.length > 0) {
        const coverId = openLibraryData.docs[0].cover_i;
        if (coverId) {
          imageUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
        }
      }
    }

    /** ────── 5️⃣ Goodreads (Web Scraping as Last Resort) ────── **/
    if (!imageUrl) {
      imageUrl = await fetchGoodreadsImage(title);
    }

    /** ────── 6️⃣ Fallback Image ────── **/
    if (!imageUrl) {
      imageUrl = "/default-cover.jpg";
    }

    // Preload image to prevent flickering
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = resolve;
      img.onerror = reject;
    });

    // Cache the result in localStorage
    localStorage.setItem(`book-image-${title}`, imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error fetching book image:", error);
    return "/default-cover.jpg"; // Final fallback
  }
};

export default fetchBookImage;
