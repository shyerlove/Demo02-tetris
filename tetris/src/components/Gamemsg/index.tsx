import { useSelector } from 'react-redux'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import './index.scss'

export default function index() {
    const { grade, score, lines } = useSelector(state => (state as any).gameMsgReducer);
    const arr = new Array(4);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(4).fill(0);
    }

    console.log(grade);

    let [nextArr, setNext] = useState(arr);
    // const show = () => {
    //     setNext(() => {
    //         let temarr = [...nextArr];
    //         temarr.map(item => {
    //             item.map((block: number) => {
    //                 block = 0;
    //             })
    //         })
    //         return temarr;
    //     })
    //     main(nextArr, setNext, nextDir, 1);
    // }


    return (
        <ul className='gameMsg'>
            <li className='grade'>
                <strong>等级</strong>
                <span>{grade}</span>
            </li>
            <li className='score'>
                <strong>分数</strong>
                <span>{score}</span>
            </li>
            <li className='lines'>
                <strong>行数</strong>
                <span>{lines}</span>
            </li>
            <li>
                <strong>下一个</strong>
                <ul>
                    {
                        arr.map((item, x) => {
                            return (
                                item.map((_: any, y: number) => {
                                    return (
                                        <li className={nextArr[x][y] ? "IsnextTetris" : "nextTetris"} key={x - y}>
                                            <span></span>
                                        </li>
                                    )
                                })
                            )
                        }) as ReactNode
                    }
                </ul>
            </li>
        </ul>
    )
}
