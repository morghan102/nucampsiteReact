import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import { addComment, fetchCampsites } from '../redux/ActionCreators';
// import { CAMPSITES } from '../shared/campsites';
// bc all app data is being stored in the redux store. there were a few others but i removed for readability


const mapStateToProps = state => {   // state will be store in this 4 redux
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,

  };
};

const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
  // FC is available to maincomp as props. we'll want to fetch that data as soon as mc is rendered to the DOM
  fetchCampsites: () => (fetchCampsites())
};
// bc if redux, what all used to be state will be props
class Main extends Component {
  // constructor(p) { p used to be props
  //   super(p);
    // this.state = 
// that used to have the whole campsirtes (capitalized) : campsites, comments: comments, etc

  // }
  // bc we have the redux store going now we dont eed the constructor, im guessing bc that data isnt being passed in here anymore



  // built in react method, one of lifecycle methods. 
  // every react comp has a LC,which is that there are certain pts where it gets created & inserted into dom, u/d, and removed from dom.
  // render method is another, plus MMMOOOOORREEE
  componentDidMount(){
    this.props.fetchCampsites();
  }
  // cdm called right after react comp is created and inserted into dom. safe place to start fetching campsite data

  render() {

    const HomePage = () => {
      // this is an arrow func bc of the nature ofthe this kywrd inside arrow functs. in arrows, this is inherited from the 'this' from their parent scope
      return (
        <Home 
          campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          
          promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
          partner={this.props.partners.filter(partner => partner.featured)[0]}        
        />
      );
    };
// recieves the props from the root componenent and we destrucutre the match from props there 
    const CampsiteWithId = ({match}) => {
      return (
        <CampsiteInfo 
          campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}

          comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
          addComment={this.props.addComment}
          />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          {/* this routes any traffic trying to go to home to the homepage component */}
          <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
          {/* this gives a route to the directory */}
          <Route path='/directory/:campsiteId' component={CampsiteWithId} />
          {/* colon tells it that after that will be a param */}
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
          {/* render bc there is partner info in the about componenet that has t be passed to it */}
          <Redirect to='/home' />
          {/* the redir is a default like a def in a js switch statement */}
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
// so main component is geting its state from the redx store