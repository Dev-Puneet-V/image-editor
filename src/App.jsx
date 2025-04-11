import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import useDebounce from "./hooks/useDebouce";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Canva from "./components/Canva";
const PIXABAY_API_KEY = "11949399-65aed49eb11c0d603c75f2056";

function App() {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const debouncedText = useDebounce(searchText, 500);
  const handleAddCaption = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const fetchImages = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
          query
        )}&image_type=photo`
      );
      const data = await res.json();
      setImages(data.hits);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedText) {
      fetchImages(debouncedText);
    }
  }, [debouncedText]);

  const handleChange = (e) => setSearchText(e.target.value);

  return (
    <div className="max-w-[90vw] mx-auto p-4">
      <SearchInput handleChange={handleChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-xl h-[320px]"
              />
            ))
          : images.map((img) => (
              <div
                key={img.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
              >
                <img
                  src={img.webformatURL}
                  alt={img.tags}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <button
                    onClick={() => handleAddCaption(img.largeImageURL)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl hover:scale-[1.02] transition-all"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    Add Captions
                  </button>
                </div>
              </div>
            ))}
      </div>
      {showModal && selectedImage && (
        <Canva
          imageUrl={selectedImage}
          onClose={() => {
            setShowModal(false);
            setSelectedImage(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
