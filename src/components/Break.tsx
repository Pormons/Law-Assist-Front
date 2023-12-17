import React, { Component } from 'react'

export default class Break extends Component {
  render() {
    return (
        <>
            <div className="relative flex items-center">
                <div className="my-12 border-t-0 bg-black"></div>
                <span className="flex-shrink mx-4 text-black">or</span>
                <div className="flex-grow border-t border-maroon"></div>
            </div>
        </>
    )
  }
}
