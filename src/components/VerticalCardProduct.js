import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct.data);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                    <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                      <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                    </div>
                    <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <div key={index} className="product-container">
                  <Link
                    to={"product/" + product?._id}
                    className="product-link w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                  >
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                      <img
                        src={product.productImage[0]}
                        className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      />
                    </div>
                    <div className="p-4 grid gap-3">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                        {product?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.category}
                      </p>
                      <div className="flex gap-3">
                        <p className="text-red-600 font-medium">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {displayINRCurrency(product?.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <>
                    <div className="flex flex-col">
                      <div>
                        <a
                          href={`https://wa.me/254707869120?text=Hello%20trendy%20Gadgets,%20I%20want%20%20the%20${
                            product.productName
                          }%20that%20%20you%20%20are%20%20selling%20%20at%20${displayINRCurrency(
                            product.sellingPrice
                          )}.%20Is%20it%20available%3F`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="order-whatsapp-btn text-sm bg-green-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full"
                        >
                          <WhatsAppIcon /> Order Via Whatsapp
                        </a>
                      </div>
                      <div>
                        <button
                          className="add-to-cart-btn text-sm bg-blue-600 hover:bg-green-700 text-white px-3 py-0.5 rounded-full mt-2"
                          onClick={(e) => handleAddToCart(e, product?._id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
// import displayINRCurrency from "../helpers/displayCurrency";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import addToCart from "../helpers/addToCart";
// import Context from "../context";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// const VerticalCardProduct = ({ category, heading }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const loadingList = new Array(13).fill(null);

//   const [scroll, setScroll] = useState(0);
//   const scrollElement = useRef();

//   const { fetchUserAddToCart } = useContext(Context);

//   const handleAddToCart = async (e, id) => {
//     await addToCart(e, id);
//     fetchUserAddToCart();
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     const categoryProduct = await fetchCategoryWiseProduct(category);
//     setLoading(false);

//     console.log("horizontal data", categoryProduct.data);
//     setData(categoryProduct?.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const scrollRight = () => {
//     scrollElement.current.scrollLeft += 300;
//   };
//   const scrollLeft = () => {
//     scrollElement.current.scrollLeft -= 300;
//   };

//   return (
//     <div className="container mx-auto px-4 my-6 relative">
//       <h2 className="text-2xl font-semibold py-4">{heading}</h2>

//       <div
//         className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
//         ref={scrollElement}
//       >
//         <button
//           className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
//           onClick={scrollLeft}
//         >
//           <FaAngleLeft />
//         </button>
//         <button
//           className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
//           onClick={scrollRight}
//         >
//           <FaAngleRight />
//         </button>

//         {loading
//           ? loadingList.map((product, index) => {
//               return (
//                 <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
//                   <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
//                   <div className="p-4 grid gap-3">
//                     <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
//                     <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
//                     <div className="flex gap-3">
//                       <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
//                       <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
//                     </div>
//                     <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
//                   </div>
//                 </div>
//               );
//             })
//           : data.map((product, index) => {
//               return (
//                 <>
//                 <Link
//                   to={"product/" + product?._id}
//                   className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
//                 >
//                   <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
//                     <img
//                       src={product.productImage[0]}
//                       className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
//                     />
//                   </div>
//                   <div className="p-4 grid gap-3">
//                     <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
//                       {product?.productName}
//                     </h2>
//                     <p className="capitalize text-slate-500">
//                       {product?.category}
//                     </p>
//                     <div className="flex gap-3">
//                       <p className="text-red-600 font-medium">
//                         {displayINRCurrency(product?.sellingPrice)}
//                       </p>
//                       <p className="text-slate-500 line-through">
//                         {displayINRCurrency(product?.price)}
//                       </p>
//                     </div>

//                     <button
//                       className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
//                       onClick={(e) => handleAddToCart(e, product?._id)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </Link>
//                 <a
//                       href={`https://wa.me/254741210060?text=Hello%20trendy%20Gadgets,%20I%20want%20%20the%20${
//                         product.productName
//                       }%20that%20%20you%20%20are%20%20selling%20%20at%20${displayINRCurrency(
//                         product.sellingPrice
//                       )}.%20Is%20it%20available%3F`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-sm bg-green-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
//                     >
//                       <WhatsAppIcon /> Order Via Whatsapp
//                     </a>
//                 </>
//               );
//             })}
//       </div>
//     </div>
//   );
// };

// export default VerticalCardProduct;
