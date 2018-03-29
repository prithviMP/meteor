//any js run automatically

//import rear lib
import React , {Component} from 'react';
import ReactDom from 'react-dom'
import ImageList from './components/image_list'
import axios from 'axios'
//create a component
class App extends Component{
    constructor(props){
        super(props);

        this.state = { images: [] };
    }

    componentWillMount(){
        axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
        .then(response => this.setState({images: response.data.data}));
        //Never do this
        // this.state.images = [{},{}];
         //its done only once above
    }
    render(){  
      return(
            <div>
                <ImageList images={this.state.images} />
            </div>    
      );
    }
};


//Render this component to the screen
Meteor.startup(() => {
    ReactDom.render(<App />, document.querySelector('.container'));
    
});
