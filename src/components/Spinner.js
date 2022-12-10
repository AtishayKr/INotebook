import React, { Component } from 'react'
import Loding from "./Loding.gif"


export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={Loding} alt="loding" />
      </div>
    )
  }
}
