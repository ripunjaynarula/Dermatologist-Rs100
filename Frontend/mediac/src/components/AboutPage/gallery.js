import React, { useState, useCallback} from "react";
   import Gallery from "react-photo-gallery";
 import { Container,   } from "reactstrap"

 
  
 
 
 export default function BlogCard(prop) {

  
  
const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
   width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
   width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
   width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3
  }
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

  
      return (
    <>         
         <Gallery photos={photos} margin = {12}  />

 
              <Container  className="align-items-center justify-content-center">


   


 </Container>
            
    
    
    </>
  )
}
  
