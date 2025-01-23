import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const Cart = () => {
    const [data, setData] = useState([]);
    const context = useContext(Context);

    // Function to fetch cart data
    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });
        const responseData = await response.json();
        if (responseData.success) {
            setData(responseData.data);
        }
    };

    // Fetch cart data
    useEffect(() => {
        fetchData();
    }, []);

    // Calculate total quantity and price
    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

    // Construct WhatsApp message
    const constructMessage = () => {
        let message = 'Hello trendy gadgets, I want the following products:\n';
        data.forEach(product => {
            message += `${product.productId.productName}: ${product.quantity} x ${displayINRCurrency(product.productId.sellingPrice)} = ${displayINRCurrency(product.productId.sellingPrice * product.quantity)}\n`;
        });
        message += `Total Price: ${displayINRCurrency(totalPrice)}\nAre they available?`;
        return encodeURIComponent(message);
    };

    // Open WhatsApp with prefilled message
    const handlePayment = () => {
        const message = constructMessage();
        const whatsappUrl = `https://wa.me/254707869120/?text=${message}`;
        window.location.href = whatsappUrl;
    };

    // Function to delete a product from the cart
    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        });
        const responseData = await response.json();
        if (responseData.success) {
            setData(data.filter(item => item._id !== id));
        }
    };

    // Function to increase quantity of a product in the cart
    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
        }
    };

    // Function to decrease quantity of a product in the cart
    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            });
            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            }
        }
    };

    // Render cart items and summary
    return (
        <div className='container mx-auto'>
            {/* Cart items */}
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* Cart items */}
                <div className='w-full max-w-3xl'>
                    {data.map((product, index) => (
                        <div key={index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                            <div className='w-32 h-32 bg-slate-200'>
                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                            </div>
                            <div className='px-4 py-2 relative'>
                                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                    <MdDelete />
                                </div>
                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                <div className='flex items-center justify-between'>
                                    <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                    <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                </div>
                                <div className='flex items-center gap-3 mt-1'>
                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                    <span>{product?.quantity}</span>
                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Summary */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    <div className='h-36 bg-white'>
                        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                            <p>Quantity</p>
                            <p>{totalQty}</p>
                        </div>
                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                            <p>Total Price</p>
                            <p>{displayINRCurrency(totalPrice)}</p>
                        </div>
                        {/* Payment button */}
                        <button className='bg-green-600 p-2 text-white w-full mt-2' onClick={handlePayment}> <WhatsAppIcon />Order and Pay Via Whatsapp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;



// import React, { useContext, useEffect, useState } from 'react';
// import SummaryApi from '../common';
// import Context from '../context';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { MdDelete } from "react-icons/md";

// const Cart = () => {
//     const [data, setData] = useState([]);
//     const context = useContext(Context);

//     // Fetch cart data
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(SummaryApi.addToCartProductView.url, {
//                 method: SummaryApi.addToCartProductView.method,
//                 credentials: 'include',
//                 headers: {
//                     "content-type": 'application/json'
//                 },
//             });
//             const responseData = await response.json();
//             if (responseData.success) {
//                 setData(responseData.data);
//             }
//         };
//         fetchData();
//     }, []);

//     // Calculate total quantity and price
//     const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
//     const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

//     // Function to delete a product from the cart
//     const deleteCartItem = async (id) => {
//         const response = await fetch(SummaryApi.deleteCartProduct.url, {
//             method: SummaryApi.deleteCartProduct.method,
//             credentials: 'include',
//             headers: {
//                 "content-type": 'application/json'
//             },
//             body: JSON.stringify({
//                 _id: id,
//             })
//         });
//         const responseData = await response.json();
//         if (responseData.success) {
//             setData(data.filter(item => item._id !== id));
//         }
//     };

//     // Function to increase the quantity of a product in the cart
//     const increaseQty = async (id, qty) => {
//         const response = await fetch(SummaryApi.updateCartProduct.url, {
//             method: SummaryApi.updateCartProduct.method,
//             credentials: 'include',
//             headers: {
//                 "content-type": 'application/json'
//             },
//             body: JSON.stringify({
//                 _id: id,
//                 quantity: qty + 1
//             })
//         });
//         const responseData = await response.json();
//         if (responseData.success) {
//             fetchData();
//         }
//     };

//     // Function to decrease the quantity of a product in the cart
//     const decreaseQty = async (id, qty) => {
//         if (qty >= 2) {
//             const response = await fetch(SummaryApi.updateCartProduct.url, {
//                 method: SummaryApi.updateCartProduct.method,
//                 credentials: 'include',
//                 headers: {
//                     "content-type": 'application/json'
//                 },
//                 body: JSON.stringify({
//                     _id: id,
//                     quantity: qty - 1
//                 })
//             });
//             const responseData = await response.json();
//             if (responseData.success) {
//                 fetchData();
//             }
//         }
//     };

//     // Fetch cart data function
//     const fetchData = async () => {
//         const response = await fetch(SummaryApi.addToCartProductView.url, {
//             method: SummaryApi.addToCartProductView.method,
//             credentials: 'include',
//             headers: {
//                 "content-type": 'application/json'
//             },
//         });
//         const responseData = await response.json();
//         if (responseData.success) {
//             setData(responseData.data);
//         }
//     };

//     // Construct WhatsApp message
//     const constructMessage = () => {
//         const productsList = data.map(product => `${product.productId.productName}: ${displayINRCurrency(product.productId.sellingPrice * product.quantity)}`).join('\n');
//         const message = `Hello trendy gadgets, I want the following products:\n${productsList}\nTotal Price: ${displayINRCurrency(totalPrice)}\nAre they available?`;
//         return message;
//     };

//     // Open WhatsApp with prefilled message
//     const handlePayment = () => {
//         const message = constructMessage();
//         const whatsappUrl = `https://wa.me/254741210060/?text=${encodeURIComponent(message)}`;
//         window.location.href = whatsappUrl;
//     };

//     // Render cart items and summary
//     return (
//         <div className='container mx-auto'>
//             {/* Cart items */}
//             <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
//                 {/* Cart items */}
//                 <div className='w-full max-w-3xl'>
//                     {data.map((product, index) => (
//                         <div key={index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
//                             <div className='w-32 h-32 bg-slate-200'>
//                                 <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
//                             </div>
//                             <div className='px-4 py-2 relative'>
//                                 <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartItem(product?._id)}>
//                                     <MdDelete />
//                                 </div>
//                                 <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
//                                 <p className='capitalize text-slate-500'>{product?.productId.category}</p>
//                                 <div className='flex items-center justify-between'>
//                                     <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
//                                     <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
//                                 </div>
//                                 <div className='flex items-center gap-3 mt-1'>
//                                     <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
//                                     <span>{product?.quantity}</span>
//                                     <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {/* Summary */}
//                 <div className='mt-5 lg:mt-0 w-full max-w-sm'>
//                     <div className='h-36 bg-white'>
//                         <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
//                         <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                             <p>Quantity</p>
//                             <p>{totalQty}</p>
//                         </div>
//                         <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                             <p>Total Price</p>
//                             <p>{displayINRCurrency(totalPrice)}</p>
//                         </div>
//                         {/* Payment button */}
//                         <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;

// import React, { useContext, useEffect, useState } from 'react';
// import SummaryApi from '../common';
// import Context from '../context';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { MdDelete } from "react-icons/md";

// const Cart = () => {
//     const [data, setData] = useState([]);
//     const context = useContext(Context);

//     // Fetch cart data
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(SummaryApi.addToCartProductView.url, {
//                 method: SummaryApi.addToCartProductView.method,
//                 credentials: 'include',
//                 headers: {
//                     "content-type": 'application/json'
//                 },
//             });
//             const responseData = await response.json();
//             if (responseData.success) {
//                 setData(responseData.data);
//             }
//         };
//         fetchData();
//     }, []);

//     // Calculate total quantity and price
//     const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
//     const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

//     // Construct WhatsApp message
//     const constructMessage = () => {
//         const productsList = data.map(product => `${product.productId.productName}: ${displayINRCurrency(product.productId.sellingPrice * product.quantity)}`).join('\n');
//         const message = `Hello trendy gadgets, I want the following products:\n${productsList}\nTotal Price: ${displayINRCurrency(totalPrice)}\nAre they available?`;
//         return message;
//     };

//     // Open WhatsApp with prefilled message
//     const handlePayment = () => {
//         const message = constructMessage();
//         const whatsappUrl = `https://wa.me/254707869120/?text=${encodeURIComponent(message)}`;
//         window.location.href = whatsappUrl;
//     };

//     // Render cart items and summary
//     return (
//         <div className='container mx-auto'>
//             {/* Cart items */}
//             <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
//                 {/* Cart items */}
//                 <div className='w-full max-w-3xl'>
//                     {data.map((product, index) => (
//                         <div key={index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
//                             <div className='w-32 h-32 bg-slate-200'>
//                                 <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
//                             </div>
//                             <div className='px-4 py-2 relative'>
//                                 <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
//                                 <p className='capitalize text-slate-500'>{product?.productId.category}</p>
//                                 <div className='flex items-center justify-between'>
//                                     <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
//                                     <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
//                                 </div>
//                                 <div className='flex items-center gap-3 mt-1'>
//                                     <span>{product?.quantity}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {/* Summary */}
//                 <div className='mt-5 lg:mt-0 w-full max-w-sm'>
//                     <div className='h-36 bg-white'>
//                         <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
//                         <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                             <p>Quantity</p>
//                             <p>{totalQty}</p>
//                         </div>
//                         <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                             <p>Total Price</p>
//                             <p>{displayINRCurrency(totalPrice)}</p>
//                         </div>
//                         {/* Payment button */}
//                         <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;

// import React, { useContext, useEffect, useState } from 'react';
// import SummaryApi from '../common';
// import Context from '../context';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { MdDelete } from "react-icons/md";

// const Cart = () => {
//     const [data, setData] = useState([]);
//     const context = useContext(Context);

//     // Fetch cart data
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(SummaryApi.addToCartProductView.url, {
//                 method: SummaryApi.addToCartProductView.method,
//                 credentials: 'include',
//                 headers: {
//                     "content-type": 'application/json'
//                 },
//             });
//             const responseData = await response.json();
//             if (responseData.success) {
//                 setData(responseData.data);
//             }
//         };
//         fetchData();
//     }, []);

//     // Calculate total quantity and price
//     const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
//     const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

//     // Construct WhatsApp message
//     const constructMessage = () => {
//         const productsList = data.map(product => `${product.productId.productName}: ${displayINRCurrency(product.productId.sellingPrice * product.quantity)}`).join('\n');
//         const message = `Hello trendy gadgets, I want the following products:\n${productsList}\nTotal Price: ${displayINRCurrency(totalPrice)}\nAre they available?`;
//         return message;
//     };

//     // Open WhatsApp with prefilled message
//     const handlePayment = () => {
//         const message = constructMessage();
//         const whatsappUrl = `https://wa.me/254741210060/?text=${encodeURIComponent(message)}`;
//         window.location.href = whatsappUrl;
//     };

//     // Render cart items and summary
//     return (
//         <div className='container mx-auto'>
//             {/* Cart items */}
//             <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
//                 {/* Cart items */}
//                 <div className='w-full max-w-3xl'>
//                     {/* Render cart items */}
//                 </div>
//                 {/* Summary */}
//                 <div className='mt-5 lg:mt-0 w-full max-w-sm'>
//                     <div className='h-36 bg-white'>
//                         <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
//                         <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                             <p>Quantity</p>
//                             <p>{totalQty}</p>
//                         </div>
//                         <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                             <p>Total Price</p>
//                             <p>{displayINRCurrency(totalPrice)}</p>
//                         </div>
//                         {/* Payment button */}
//                         <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;


// import React, { useContext, useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import Context from '../context'
// import displayINRCurrency from '../helpers/displayCurrency'
// import { MdDelete } from "react-icons/md";

// const Cart = () => {
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)
//     const context = useContext(Context)
//     const loadingCart = new Array(4).fill(null)


//     const fetchData = async() =>{
        
//         const response = await fetch(SummaryApi.addToCartProductView.url,{
//             method : SummaryApi.addToCartProductView.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//         })
       

//         const responseData = await response.json()

//         if(responseData.success){
//             setData(responseData.data)
//         }


//     }

//     const handleLoading = async() =>{
//         await fetchData()
//     }

//     useEffect(()=>{
//         setLoading(true)
//         handleLoading()
//          setLoading(false)
//     },[])


//     const increaseQty = async(id,qty) =>{
//         const response = await fetch(SummaryApi.updateCartProduct.url,{
//             method : SummaryApi.updateCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {   
//                     _id : id,
//                     quantity : qty + 1
//                 }
//             )
//         })

//         const responseData = await response.json()


//         if(responseData.success){
//             fetchData()
//         }
//     }


//     const decraseQty = async(id,qty) =>{
//        if(qty >= 2){
//             const response = await fetch(SummaryApi.updateCartProduct.url,{
//                 method : SummaryApi.updateCartProduct.method,
//                 credentials : 'include',
//                 headers : {
//                     "content-type" : 'application/json'
//                 },
//                 body : JSON.stringify(
//                     {   
//                         _id : id,
//                         quantity : qty - 1
//                     }
//                 )
//             })

//             const responseData = await response.json()


//             if(responseData.success){
//                 fetchData()
//             }
//         }
//     }

//     const deleteCartProduct = async(id)=>{
//         const response = await fetch(SummaryApi.deleteCartProduct.url,{
//             method : SummaryApi.deleteCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {   
//                     _id : id,
//                 }
//             )
//         })

//         const responseData = await response.json()

//         if(responseData.success){
//             fetchData()
//             context.fetchUserAddToCart()
//         }
//     }

//     const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
//     const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
//   return (
//     <div className='container mx-auto'>
        
//         <div className='text-center text-lg my-3'>
//             {
//                 data.length === 0 && !loading && (
//                     <p className='bg-white py-5'>No Data</p>
//                 )
//             }
//         </div>

//         <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
//                 {/***view product */}
//                 <div className='w-full max-w-3xl'>
//                     {
//                         loading ? (
//                             loadingCart?.map((el,index) => {
//                                 return(
//                                     <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
//                                     </div>
//                                 )
//                             })
                             
//                         ) : (
//                           data.map((product,index)=>{
//                            return(
//                             <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
//                                 <div className='w-32 h-32 bg-slate-200'>
//                                     <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
//                                 </div>
//                                 <div className='px-4 py-2 relative'>
//                                     {/**delete product */}
//                                     <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
//                                         <MdDelete/>
//                                     </div>

//                                     <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
//                                     <p className='capitalize text-slate-500'>{product?.productId.category}</p>
//                                     <div className='flex items-center justify-between'>
//                                             <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
//                                             <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
//                                     </div>
//                                     <div className='flex items-center gap-3 mt-1'>
//                                         <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
//                                         <span>{product?.quantity}</span>
//                                         <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
//                                     </div>
//                                 </div>    
//                             </div>
//                            )
//                           })
//                         )
//                     }
//                 </div>


//                 {/***summary  */}
//                 <div className='mt-5 lg:mt-0 w-full max-w-sm'>
//                         {
//                             loading ? (
//                             <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
//                             </div>
//                             ) : (
//                                 <div className='h-36 bg-white'>
//                                     <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Quantity</p>
//                                         <p>{totalQty}</p>
//                                     </div>

//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Total Price</p>
//                                         <p>{displayINRCurrency(totalPrice)}</p>    
//                                     </div>

//                                     <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

//                                 </div>
//                             )
//                         }
//                 </div>
//         </div>
//     </div>
//   )
// }

// export default Cart