// import { fetchEditProduct, deleteImage, uploadImage } from '../../../Redux/updateProductSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import ClearIcon from '@material-ui/icons/Clear';

// const EditComponent = ({ productId }) => {
//     const dispatch = useDispatch();
//     const { fetchedImages } = useSelector((state) => state.editproducts); // images selector
//     const [images, setImages] = useState([]);
//     const [imagesPreview, setImagesPreview] = useState([]);

//     useEffect(() => {
//         if (fetchedImages && fetchedImages.length > 0) {
//             const uploadedImages = fetchedImages.map(img => ({
//                 src: img.imageUrl,
//                 isUploaded: true,
//                 imageId: img.imageId,
//                 name: img.name,
//                 priority: img.priority
//             }));
//             setImages(uploadedImages);
//             setImagesPreview(uploadedImages);
//         }
//     }, [fetchedImages]);

//     useEffect(() => {
//         if (imagesPreview.length > 0) {
//             console.log("Images Preview:", imagesPreview);
//         }
//     }, [imagesPreview]);

//     const onFileSelect = async (event, productId) => {
//         const file = event.target.files[0];
//         if (!file) return;
//         const totalImages = images.length;
//         if (totalImages >= 5) {
//             alert("You can only select a maximum of 5 images.");
//             return;
//         }

//         const newImage = {
//             file,
//             isUploaded: false
//         };
//         const newImagePreview = {
//             src: URL.createObjectURL(file),
//             isUploaded: false
//         };

//         // Update state
//         setImages(prevImages => [...prevImages, newImage]);
//         setImagesPreview(prevPreviews => {
//             // Revoke previous URLs if not uploaded
//             prevPreviews.forEach(img => !img.isUploaded && URL.revokeObjectURL(img.src));
//             return [...prevPreviews, newImagePreview];
//         });

//         if (!productId) {
//             console.error('Product ID is missing');
//             return;
//         }

//         dispatch(uploadImage({ productId, file }))
//             .then(() => {
//                 alert('Image uploaded successfully');
//             })
//             .catch((error) => {
//                 console.error('Error uploading image:', error);
//             });
//     };

//     const onDeleteImage = async (imageId, index) => {
//         const response = await dispatch(deleteImage(imageId));
//         if (response.meta.requestStatus === 'fulfilled') {
//             setImages(prevImages => {
//                 const newImages = [...prevImages];
//                 newImages.splice(index, 1);
//                 return newImages;
//             });
//             setImagesPreview(prevPreviews => {
//                 const newPreviews = [...prevPreviews];
//                 // Revoke object URL if not uploaded
//                 if (!newPreviews[index].isUploaded) {
//                     URL.revokeObjectURL(newPreviews[index].src);
//                 }
//                 newPreviews.splice(index, 1);
//                 return newPreviews;
//             });
//             alert('Image deleted successfully');
//         } else {
//             console.error('Error deleting image:', response.payload);
//             alert('Error deleting image');
//         }
//     };

//     return (
//         <div className="edit-file-input-container">
//             <label htmlFor="edit-file-upload" className="edit-custom-file-upload">
//                 Choose Files
//             </label>
//             <input type="file" id="edit-file-upload" onChange={(event) => onFileSelect(event, productId)} className="edit-file-input" />
//             <div className="flex" style={{ gap: '10px' }}>
//                 {imagesPreview.map((image, index) => (
//                     <div className='edit-img-card' key={index}>
//                         <img className='edit-imgs' src={image.src} alt={`Preview ${index}`} />
//                         <span className="edit-delete" onClick={() => onDeleteImage(image.imageId, index)}><ClearIcon /></span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EditComponent;
