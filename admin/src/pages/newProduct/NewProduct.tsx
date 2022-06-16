// import { useState } from "react";
// import "./newProduct.css";
// // import {
// //   getStorage,
// //   ref,
// //   uploadBytesResumable,
// //   getDownloadURL,
// // } from "firebase/storage";
// // import app from "../../firebase";
// import { addProduct } from "../../redux/apiCalls";
// import { useDispatch } from "react-redux";

// export default function NewProduct() {
//   const [inputs, setInputs] = useState({});
//   const [image, setImage] = useState<any>(null);
//   const [categories, setCategories] = useState([]);
//   const dispatch = useDispatch();

//   const handleChange = (e: any) => {
//     setInputs((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };
//   const handleCategory = (e: any) => {
//     setCategories(e.target.value.split(","));
//   };

//   const handleClick = (e: any) => {
//     e.preventDefault();
//     const fileName = new Date().getTime() + image.name;
//     const storage = getStorage(app);
//     const StorageRef = ref(storage, fileName);

//     const uploadTask = uploadBytesResumable(StorageRef, image);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//         }
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           const product = { ...inputs, image: downloadURL, categories };
//           addProduct(product, dispatch);
//         });
//       }
//     );
//   };

//   return (
//     <div className="newProduct">
//       <h1 className="addProductTitle">New Product</h1>
//       <form className="addProductForm">
//         <div className="addProductItem">
//           <label>Image</label>
//           <input
//             type="file"
//             id="file"
//             //@ts-ignore
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Title</label>
//           <input
//             type="text"
//             placeholder="Apple Airpods"
//             name="title"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Price</label>
//           <input
//             type="number"
//             placeholder="Apple Airpods"
//             name="price"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Category</label>
//           <input
//             type="text"
//             placeholder="Apple Airpods"
//             onChange={handleCategory}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Description</label>
//           <input
//             type="text"
//             placeholder="Apple Airpods"
//             name="desc"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Stock</label>
//           <select name="inStock" onChange={handleChange}>
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>

//         <button className="addProductButton" onClick={handleClick}>
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }



import React from 'react'

const NewProduct = () => {
  return (
    <div>NewProduct</div>
  )
}

export default NewProduct