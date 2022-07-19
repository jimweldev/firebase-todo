import React from 'react'
import { Bars } from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './Loading.css'

const Loading = () => {
  return (
    <div className="loader__wrapper">
      <Bars
        heigth="100"
        width="100"
        color="#00c590"
        ariaLabel="loading-indicator"
      />
    </div>
  )
}

export default Loading
