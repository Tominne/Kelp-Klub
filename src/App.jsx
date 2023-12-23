import React, { Component } from 'react'
import $ from 'jquery'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
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

  applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
    this.swapCurrentlyActiveLanguage(oppositeLangIconId)
    document.documentElement.lang = pickedLanguage
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`
    this.loadResumeFromPath(resumePath)
  }

  swapCurrentlyActiveLanguage(oppositeLangIconId) {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute('filter', 'brightness(40%)')
    document
      .getElementById(pickedLangIconId)
      .setAttribute('filter', 'brightness(40%)')
  }

  componentDidMount() {
    this.loadSharedData()
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    )
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
          <div style={{ display: 'inline' }}>
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </div>
          <div style={{ display: 'inline' }}>
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-poland"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </div>
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
