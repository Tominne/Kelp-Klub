import React, { Component } from 'react'
import $ from 'jquery'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Projects from './components/Projects'

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
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        <div className="background">
        </div>

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
