import React from 'react'
import './index.scss'

type Props = {}

export default function index({ }: Props) {
    return (
        <div className="controller">
            <div className="settings">
                <button className="replay"></button>
                <button className="stop"></button>
            </div>
            <div className="games">
                <div className="left">
                    <button className='top-btn'>▲</button>
                    <button className='right-btn'>▶</button>
                    <span></span>
                    <button className='bottom-btn'>▼</button>
                    <button className='left-btn' >◀</button>
                </div>
                <div className="right">
                    <button className='rotate-btn'></button>
                </div>
            </div>
        </div>
    )
}