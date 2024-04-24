import React, {
    ReactNode,
    useState,
    useEffect,
} from 'react'
import { clearRow, getType, main, } from './df.ts'
import { addGrade, addLines, addScore } from '../../store/gameMsgStore.ts'
import { useSelector, useDispatch } from 'react-redux'
import './index.scss'

export type Block = Array<Array<number>>;
export type Now = Array<Array<number> | string>;
const Gamewin = () => {
    /* 声明一个变量，存储当前的形状位置 */
    let nowDir: Now = [];
    let nextDir: Now = getType();
    /* 初始化界面（共200个格子）*/
    let arr = new Array(20)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(10).fill(0)
    }
    /* 获取dispatch实例 */
    const dispatch = useDispatch();
    let [tetrisArr, setTetrisArr] = useState(JSON.parse(JSON.stringify(arr)));

    // dispatch(changeNextDir(nextDir));
    /* 方块下落速度 */
    let time: number = 200;
    let { score } = useSelector(state => (state as any).gameMsgReducer);
    // let myScore = score ;
    /* 是否开启/暂停游戏 */
    let isPlay = true;
    /* 声明一个定时器控制器 */
    let timer: NodeJS.Timeout;
    /* 方块下落 */
    const go = () => {
        nowDir = main(tetrisArr, setTetrisArr, nextDir, 1);
        nextDir = getType();
        window.addEventListener('keyup', moveX);
        moveY();
    }

    /* 钩子 */
    useEffect(() => {
        go();
    }, [])



    /* 左移规则 */
    const LeftRule = (dir: Now) => {
        let arr = true;
        dir.map(item => {
            if (typeof (item) !== 'string') {
                if (item[1] >= 1) {
                    return;
                } else {
                    arr = false;
                }
            }
        })
        return arr;
    }
    /* 右移规则 */
    const RightRule = (dir: Now) => {
        let arr = true;
        dir.map(item => {
            if (typeof (item) !== 'string') {
                if (item[1] <= 8) {
                    return;
                } else {
                    arr = false;
                }
            }
        })
        return arr;
    }
    /* 下移规则 */
    const downRule = (dir: Now) => {
        let arr = true;
        dir.map(item => {
            if (typeof (item) !== 'string') {
                if ((item[0]) <= 18) {
                    return;
                } else {
                    arr = false;
                }
            }
        })
        return arr;
    }
    /* 旋转规则 */
    const rotateRule = (dir: Now) => {
        let arr = [...dir];
        let [x1, y1] = (arr[0] as number[]);
        let [x2, y2] = (arr[1] as number[]);
        let [x3, y3] = (arr[2] as number[]);
        let [x4, y4] = (arr[3] as number[]);
        switch (arr[4]) {
            case 'T':
                //    dir[1] // 旋转点
                if (x1 == x2 && y1 + 1 == y2) {
                    (arr[0] as number[]) = [x1, y1 + 1];
                    (arr[1] as number[]) = [x2 + 1, y2 - 1];
                    (arr[2] as number[]) = [x3 + 1, y3 - 1];
                    (arr[3] as number[]) = [x4 + 1, y4];
                } else if ((x1 + 1 == x2 && y1 - 1 == y2) && (x1 + 2 == x4 && y1 == y4)) {
                    (arr[0] as number[]) = [x1, y1];
                    (arr[1] as number[]) = [x2, y2];
                    (arr[2] as number[]) = [x3, y3];
                    (arr[3] as number[]) = [x4 - 1, y4 + 1];

                } else if ((x1 + 1 == x2 && y1 - 1 == y2) && (x1 + 1 == x4 && y1 + 1 == y4)) {
                    (arr[0] as number[]) = [x1, y1];
                    (arr[1] as number[]) = [x2, y2 + 1];
                    (arr[2] as number[]) = [x3, y3 + 1];
                    (arr[3] as number[]) = [x4 + 1, y4 - 1];

                } else if (x1 + 1 == x2 && y1 == y2) {
                    (arr[0] as number[]) = [x1, y1 - 1];
                    (arr[1] as number[]) = [x2 - 1, y2];
                    (arr[2] as number[]) = [x3 - 1, y3];
                    (arr[3] as number[]) = [x4 - 1, y4];
                }
                break;
            case 'J':

                if (x1 + 2 == x3 && y1 - 1 == y3) {
                    (arr[0] as number[]) = [x1, y1 - 1];
                    (arr[1] as number[]) = [x2, y2 - 1];
                    (arr[2] as number[]) = [x3 - 1, y3 + 1];
                    (arr[3] as number[]) = [x4 - 1, y4 + 1];
                } else if (x1 + 1 == x3 && y1 + 1 == y3) {
                    (arr[0] as number[]) = [x1, y1];
                    (arr[1] as number[]) = [x2 - 1, y2 + 1];
                    (arr[2] as number[]) = [x3, y3 - 1];
                    (arr[3] as number[]) = [x4 + 1, y4 - 2];

                } else if (x1 + 1 == x3 && y1 == y3) {
                    (arr[0] as number[]) = [x1, y1];
                    (arr[1] as number[]) = [x2, y2];
                    (arr[2] as number[]) = [x3 - 1, y3 + 2];
                    (arr[3] as number[]) = [x4 - 1, y4 + 2];

                } else if (x1 == x3 && y1 + 2 == y3) {
                    (arr[0] as number[]) = [x1, y1 + 1];
                    (arr[1] as number[]) = [x2 + 1, y2];
                    (arr[2] as number[]) = [x3 + 2, y3 - 2];
                    (arr[3] as number[]) = [x4 + 1, y4 - 1];
                }

                break;
            case 'L':
                if (x1 + 2 == x3 && y1 == y3) {
                    (arr[0] as number[]) = [x1, y1];
                    (arr[1] as number[]) = [x2 - 1, y2 + 1];
                    (arr[2] as number[]) = [x3 - 2, y3 + 2];
                    (arr[3] as number[]) = [x4 - 1, y4 - 1];
                } else if (x1 == x3 && y1 + 2 == y3) {
                    (arr[0] as number[]) = [x1, y1];
                    (arr[1] as number[]) = [x2, y2];
                    (arr[2] as number[]) = [x3 + 1, y3 - 1];
                    (arr[3] as number[]) = [x4 + 1, y4 + 1];

                } else if (x1 + 1 == x3 && y1 + 1 == y3) {
                    (arr[0] as number[]) = [x1, y1 + 2];
                    (arr[1] as number[]) = [x2 + 1, y2 - 1];
                    (arr[2] as number[]) = [x3, y3];
                    (arr[3] as number[]) = [x4 - 1, y4 + 1];

                } else if (x1 + 1 == x3 && y1 - 1 == y3) {
                    (arr[0] as number[]) = [x1, y1 - 2];
                    (arr[1] as number[]) = [x2, y2];
                    (arr[2] as number[]) = [x3 + 1, y3 - 1];
                    (arr[3] as number[]) = [x4 + 1, y4 - 1];
                }
                break;
            case 'O':
                break;
            case 'S':
                if (x1 + 1 == x2 && y1 == y2) {
                    (arr[0] as number[]) = [x1, y1 + 1];
                    (arr[1] as number[]) = [x2 - 1, y2 + 2];
                    (arr[2] as number[]) = [x3, y3 - 1];
                    (arr[3] as number[]) = [x4 - 1, y4];
                } else if (x1 == x2 && y1 + 1 == y2) {
                    (arr[0] as number[]) = [x1, y1 - 1];
                    (arr[1] as number[]) = [x2 + 1, y2 - 2];
                    (arr[2] as number[]) = [x3, y3 + 1];
                    (arr[3] as number[]) = [x4 + 1, y4];
                }
                break;
            case 'Z':
                if (x1 + 1 == x2 && y1 - 1 == y2) {
                    (arr[0] as number[]) = [x1, y1 - 1];
                    (arr[1] as number[]) = [x2 - 1, y2 + 1];
                    (arr[2] as number[]) = [x3, y3];
                    (arr[3] as number[]) = [x4 - 1, y4 + 2];
                } else if (x1 == x2 && y1 + 1 == y2) {
                    (arr[0] as number[]) = [x1, y1 + 1];
                    (arr[1] as number[]) = [x2 + 1, y2 - 1];
                    (arr[2] as number[]) = [x3, y3];
                    (arr[3] as number[]) = [x4 + 1, y4 - 2];
                }
                break;
            case 'I':
                if (x1 + 1 == x2 && y1 == y2) {
                    (arr[0] as number[]) = [x1 + 1, y1 - 1];
                    (arr[1] as number[]) = [x2, y2];
                    (arr[2] as number[]) = [x3 - 1, y3 + 1];
                    (arr[3] as number[]) = [x4 - 2, y4 + 2];
                } else if (x1 == x2 && y1 + 1 == y2) {
                    (arr[0] as number[]) = [x1 - 1, y1 + 1];
                    (arr[1] as number[]) = [x2, y2];
                    (arr[2] as number[]) = [x3 + 1, y3 - 1];
                    (arr[3] as number[]) = [x4 + 2, y4 - 2];
                }
                break;

            default:
                break;
        }
        let boo = true;
        arr.forEach(item => {
            if (typeof (item) !== 'string') {
                let [x, y] = item;
                if ((x < 0 || x > 19) || (y < 0 || y > 9)) {
                    boo = false;
                }
            }
        })
        console.log(boo ? arr : nowDir);

        return boo ? arr : nowDir;
    }
    /* 检测一行里有没有方块,dir：0：左移，1：右移 2：下移 */
    const isHaveBlock = (dirs: Now, dir: 0 | 1 | 2) => {
        let temBlocks = JSON.parse(JSON.stringify(tetrisArr));
        let num = 0;
        dirs.map(val => {
            if (typeof (val) !== 'string') {
                let [x, y] = val;
                temBlocks[x][y] = 0; // 模拟:擦除现在的位置
            }
        })
        dirs.map(val => {
            if (typeof (val) !== 'string') {
                let [x, y] = val;
                switch (dir) {
                    case 0:
                        num += temBlocks[x][y - 1]; // 模拟下一次的位置，判断有没有空着
                        break;
                    case 1:
                        num += temBlocks[x][y + 1]; // 模拟下一次的位置，判断有没有空着
                        break;
                    case 2:
                        num += temBlocks[x + 1][y]; // 模拟下一次的位置，判断有没有空着
                        break;
                }
            }
        })
        if (num > 0) {
            return false;
        } else {
            return true;
        }
    }
    /* 定义一个方块变动的事件 */
    const moveX = (e: KeyboardEvent) => {
        // key :"ArrowRight" "ArrowLeft"
        if (e.key === 'ArrowRight' && RightRule(nowDir)) {
            if (isHaveBlock(nowDir, 1)) {
                main(tetrisArr, setTetrisArr, nowDir, 0);
                /* 右移 => y+1 */
                nowDir.map(item => {
                    if (typeof (item) !== 'string')
                        item[1] += 1;
                })
                main(tetrisArr, setTetrisArr, nowDir, 1);
            }
        } else if (e.key === 'ArrowLeft' && LeftRule(nowDir)) {
            if (isHaveBlock(nowDir, 0)) {
                main(tetrisArr, setTetrisArr, nowDir, 0);
                /* 右移 => y+1 */
                nowDir.map(item => {
                    if (typeof (item) !== 'string')
                        item[1] -= 1;
                })
                main(tetrisArr, setTetrisArr, nowDir, 1);
            }
        } else if (e.key === 'Enter') {
            main(tetrisArr, setTetrisArr, nowDir, 0);
            nowDir = rotateRule(nowDir);
            main(tetrisArr, setTetrisArr, nowDir, 1);
        } else if (e.key === 's') {
            isPlay = !isPlay;
            if (isPlay) {
                moveY();
                window.addEventListener('keyup', moveX);
            } else {
                clearInterval(timer);
                window.removeEventListener('keyup', moveX);
            }
        }
    }
    /* 消除方法 */
    const clear = () => {
        let num = 0;
        let temX = 0;
        let lines = 0;
        tetrisArr.forEach((row: Array<number>, index: number) => { // 遍历每一行
            row.forEach(j => { // 遍历每行中的每一项
                // console.log(j);
                num += j; // 相加
                if (num == 10) { // 等于10 表示该行可以消除
                    temX = index; // 获取x轴 0
                    clearRow(tetrisArr, setTetrisArr, temX);// 清除x轴上的方块
                    lines++;
                } else { return }
            })
            num = 0;
        })
        dispatch(addLines(lines));
        dispatch(addScore(lines * lines * 1000));
        score += lines * lines * 1000;
        console.log(score);

        if (score % 2000 == 0 && score != 0) { dispatch(addGrade()) };
    }
    /* 定义一个持续下移的事件 */
    const moveY = () => {
        timer = setInterval(() => {
            if (downRule(nowDir)) {
                if (isHaveBlock(nowDir, 2)) {
                    nowDir = main(tetrisArr, setTetrisArr, nowDir, 0);
                    nowDir.forEach((item) => {
                        if (typeof (item) !== 'string') {
                            item[0] += 1;
                        }
                    })
                    nowDir = main(tetrisArr, setTetrisArr, nowDir, 1);
                } else {
                    clear();
                    clearInterval(timer); // 到达底部
                    window.removeEventListener('keyup', moveX); // 移除移动事件
                    go(); //继续下落
                }
            } else {
                clear();
                clearTimeout(timer); // 到达底部
                window.removeEventListener('keyup', moveX); // 移除移动事件
                go(); //继续下落
            }
        }, time)
    }



    return (
        <div className='tetrisWin'>
            {
                arr.map((item, x) => {
                    return (
                        item.map((_: any, y: number) => {
                            return (
                                <li className={tetrisArr[x][y] ? 'isTetris' : 'tetris'}
                                    key={`${x}-${y}`}>
                                    <span></span>
                                </li>
                            )
                        })
                    )
                }) as ReactNode
            }
        </div>
    )
}

export default Gamewin;
