import React from "react";
import "./styles.css";
import useWindowDimensions from "../functions/windowDimensions";

class SelectBox extends React.Component {

 constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = {
    isListOpen: false,
    headerTitle: this.props.title,
        isTop: false,
 width: 0, height: 0 
  }
   }
 close = () => {
  this.setState({
    isListOpen: false,
  });
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions = () => {
       this.setState(prevState => ({
  width: window.innerWidth, height: window.innerHeight 
    })) 
}

  componentDidMount() {
   if(this.props.type === "trans")
   {
        document.addEventListener('scroll', () => {
      const isTop = window.scrollY > 20;
      if (isTop !== this.state.isTop) {
          console.log(isTop)
          this.setState({ isTop })
      }
    });
   }else{
       this.setState({ isTop : true})
   }
    this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
  }

componentDidUpdate(){
  const { isListOpen } = this.state;

  setTimeout(() => {
    if(isListOpen){
      window.addEventListener('click', this.close)
    }
    else{
      window.removeEventListener('click', this.close)
    }
  }, 0)
}


handleClict = (e) =>{
        e.preventDefault();

}
toggleList = () => {
   this.setState(prevState => ({
     isListOpen: !prevState.isListOpen
  }))
}
  render() {
 
        const { isListOpen, headerTitle } = this.state;

    return (
   

<div class="navlink dropdown nav-item" style={{}} onClick = {this.toggleList} ><a aria-haspopup="true" onClick = {this.handleClict} aria-expanded="false" href="#" class="dropdown-toggle nav-link" role="button" style={{ transition: '0.5s ease',  color :   this.state.width < 1201 ? "#62636a" : !this.state.isTop ? "white" :   "#62636a" }}>{this.props.title}</a>

  {isListOpen && this.props.data } 

</div>



   
       );
  }
}

export default SelectBox;
