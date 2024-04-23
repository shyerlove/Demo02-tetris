import './index.scss'
import Gamemsg from '../../components/Gamemsg'
import Tetriswin from '../../components/Tetriswin'
import React from 'react'

let c: Function;
export default function index() {
    return (
        <div className='gameWin'>
            <div className="screen-border">
                <div className="screen">
                    {/* 游戏画面 */}
                    <Tetriswin></Tetriswin>
                    {/* 游戏信息画面 */}
                    <Gamemsg></Gamemsg>
                </div>
            </div>
        </div>
    )
}
