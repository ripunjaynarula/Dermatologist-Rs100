import React, { useState, useCallback} from "react";
   import Gallery from "react-photo-gallery";
 import { Container,   } from "reactstrap"

 
  
 
 
 export default function BlogCard(prop) {

  
  
const photos = [
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-gallery1.jpg",
    width: 1,
    height: 1
  },
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-gallery2.jpg",
    width: 1,
    height: 1
  },
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-gallery3.jpg",
    width: 1,
    height: 1
  },
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-gallery4.jpg",
   width: 4,
    height: 3
  },
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-gallery5.jpg",
    width: 2,
    height: 1.7
  },
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-gallery6.jpg",
      width: 2,
    height: 1.7
  },
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-pic1.jpg",
      width: 2,
    height: 1.7
  },
  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-pic2.jpg",
       width: 2,
    height: 1.7
  },  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-pic3.jpg",
     width: 2,
    height: 1.7
  },  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-pic4.jpg",
     width: 2,
    height: 1.7
  },  {
    src: process.env.REACT_APP_CDN_URL+"images/clinic-pic5.jpg",
    width: 2,
    height: 1.7
  },

];



  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  console.log(process.env.REACT_APP_CDN_URL+"images/clinic-pic5.jpg")
      return (
    <>         
         <Gallery photos={photos} margin = {13}  />

 
              <Container  className="align-items-center justify-content-center">


   


 </Container>
            
    
    
    </>
  )
}
  
