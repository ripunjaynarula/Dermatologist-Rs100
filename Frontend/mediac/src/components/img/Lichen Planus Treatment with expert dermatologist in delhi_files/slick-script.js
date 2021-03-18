$(document).ready(function(){
$('.slick-track').slick({
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
		
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
		autoplay: true,
  		autoplaySpeed: 2000,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
		autoplay: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1
      }
    }
  ]
});
});

$(document).ready(function(){
$('.slick-track1').slick({
  dots: false,
  infinite: true,
  autoplay: true,
  fade: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
		
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
		autoplay: true,
  		autoplaySpeed: 2000,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
		autoplay: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1
      }
    }
  ]
});
});