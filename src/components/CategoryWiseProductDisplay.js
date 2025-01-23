import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBuyOnWhatsApp = (productName, sellingPrice) => {
    const message = `Hello Trendy Gadgets, I want ${productName} that you are selling at ${displayINRCurrency(sellingPrice)}. Is it available?`;
    const whatsappLink = `https://wa.me/254707869120?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
                  {/* Placeholder for loading state */}
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <div key={index} className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      alt={product.productName}
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                    <p className="capitalize text-slate-500">{product?.category}</p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                      <p className="text-slate-500 line-through">{displayINRCurrency(product?.price)}</p>
                    </div>
                    <button
                      className="text-sm bg-green-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full"
                      onClick={() => handleBuyOnWhatsApp(product?.productName, product?.sellingPrice)}
                    >
                      <WhatsAppIcon />
                      Buy on WhatsApp
                    </button>
                    <button
                      className="text-sm bg-blue-600 hover:bg-green-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;

