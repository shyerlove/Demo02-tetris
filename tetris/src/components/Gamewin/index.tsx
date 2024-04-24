import './index.scss'
import Gamemsg from '../../components/Gamemsg'
import Tetriswin from '../../components/Tetriswin'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'


const Gamewin = () => {

    return (
        <div className='gameWin'>
            <div className="screen-border">
                <div className="screen">
                    {/* 游戏画面 */}
                    <Tetriswin ></Tetriswin>
                    {/* 游戏信息画面 */}
                    <Gamemsg></Gamemsg>
                </div>
            </div>
        </div>
    )
}

export default Gamewin;