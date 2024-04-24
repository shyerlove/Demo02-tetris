import React from 'react'
import './index.scss'
import { useDispatch } from 'react-redux'
import { changeIsPlay, changeRight, changeLeft, changeRotate } from '../../store/controllerStore'

export default function index() {
    const dispatch = useDispatch();

    return (
        <div className="controller">
            <div className="settings">
                <button className="replay"></button>
                <button className="stop" onClick={() => { dispatch(changeIsPlay()) }}></button>
            </div>
            <div className="games">
                <div className="left">
                    <button className='top-btn' >▲</button>
                    <button className='right-btn' onClick={() => dispatch(changeRight())}>▶</button>
                    <span></span>
                    <button className='bottom-btn'>▼</button>
                    <button className='left-btn' onClick={() => dispatch(changeLeft())}>◀</button>
                </div>
                <div className="right">
                    <button className='rotate-btn' onClick={() => dispatch(changeRotate())}></button>
                </div>
            </div>
        </div>
    )
}