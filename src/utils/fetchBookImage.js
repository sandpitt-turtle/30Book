const fetchBookImage = async (title) => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      throw new Error("Google Books API key is missing");
    }

    // Check local storage cache first
    const cachedImage = localStorage.getItem(`book-image-${title}`);
    if (cachedImage) return cachedImage;

    // Fetch from Google Books API
    const googleResponse = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`
    );
    const googleData = await googleResponse.json();

    let imageUrl = null;

    if (googleData.items && googleData.items.length > 0) {
      imageUrl = googleData.items[0].volumeInfo.imageLinks?.thumbnail || null;
    }

    // If no image from Google Books, try Open Library
    if (!imageUrl) {
      const openLibraryResponse = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
      );
      const openLibraryData = await openLibraryResponse.json();

      if (openLibraryData.docs && openLibraryData.docs.length > 0) {
        const coverId = openLibraryData.docs[0].cover_i;
        if (coverId) {
          imageUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        }
      }
    }

    // Fallback image if none found
    if (!imageUrl) {
      imageUrl = "/default-cover.jpg";
    }

    // Preload image before returning
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
    return "/default-cover.jpg"; // Fallback cover image in case of error
  }
};

export default fetchBookImage;
