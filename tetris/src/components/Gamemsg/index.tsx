import React from 'react'
import './index.scss'

export default function index() {
    return (
        <ul className='gameMsg'>
            <li className='grade'>
                <strong>等级</strong>
                <span>0</span>
            </li>
            <li className='score'>
                <strong>分数</strong>
                <span>0</span>
            </li>
            <li className='lines'>
                <strong>行数</strong>
                <span>0</span>
            </li>
            <li className='next'>
                <strong>下一个</strong>
                <span></span>
            </li>
        </ul>
    )
}
