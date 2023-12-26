import React, { Component } from 'react'
import $ from 'jquery'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Switchboard from './switchboard'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      foo: 'bar',
      resumeData: {},
      sharedData: {},
    }
  }

  componentDidMount() {
    this.loadSharedData()
    this.loadResumeFromPath('landingPageData.json')
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data })
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err)
      },
    })
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data })
        document.title = `${this.state.sharedData.basic_info.name}`
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err)
      },
    })
  }


  render() {
    if (!this.state.sharedData || !this.state.sharedData.basic_info|| !this.state.sharedData.basic_info.image) {
      return <div>Loading...</div>
    }
    return (
      <div>
      <div className='header'>
         <img className='img centre slider-image' src='images/myProfile.jpg' alt="My Face" />
         </div>
        <Header
        sharedData = {this.state.sharedData.basic_info} />
<QueryClientProvider client={queryClient}>
        <Router>
        <nav className="background">
         
           
              <Link to="/switchboard">Switchboard</Link>
              
          
        </nav>
         <Routes>
          <Route path="/switchboard" Component={Switchboard} />
         </Routes>
        </Router>
        </QueryClientProvider>
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />

        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    )
  }
}

export default App
