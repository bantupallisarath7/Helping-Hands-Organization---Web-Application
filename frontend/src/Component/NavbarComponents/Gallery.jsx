import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const Gallery = ({ isAdmin }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {

      const res = await axios.get("http://localhost:8815/admin/gallery/all");
      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setImages(res.data.images);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowLeft" && selectedIndex > 0) {
          setSelectedIndex((prev) => prev - 1);
        } else if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
          setSelectedIndex((prev) => prev + 1);
        } else if (e.key === "Escape") {
          setSelectedIndex(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  const handleDelete = async (index, id) => {
    try {
      const res = await axios.delete(`http://localhost:8815/admin/gallery/delete/${id}`, { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      const updated = [...images];
      updated.splice(index, 1);
      setImages(updated);
      toast.success(res.data.message);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:8815/admin/gallery/upload", formData, { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message);
      fetchImages(); // Refresh gallery
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-red-900">OUR GALLERY</h2>
        {isAdmin && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
            >
              Upload Image
            </label>
          </>
        )}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No images in the gallery
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-md">
            Images will appear here once the admin uploads them. Please check back later.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              fetchImages();
            }}
            className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
          >
            Refresh Gallery
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:8815${image.imageUrl}`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              />

              {/* Delete Icon (Admin Only) */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(index, image._id)}
                  className="absolute top-2 right-2 bg-white text-red-700 p-1 rounded-full shadow hover:bg-red-700 hover:text-white transition opacity-0 group-hover:opacity-100"
                  title="Delete Image"
                >
                  <MdDelete className="text-lg" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Enlarged Image Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <img
            src={`http://localhost:8815${images[selectedIndex].imageUrl}`}
            alt={`Gallery ${selectedIndex + 1}`}
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;