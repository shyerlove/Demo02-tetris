import type { Block, Now } from "./index";
/* 获取特使形状的方块组合 */
const getType = (): Now => {
    let blocks = [
        [[0, 0], [0, 1], [0, 2], [1, 1], 'T'],
        [[0, 1], [1, 1], [2, 0], [2, 1], 'J'],
        [[0, 0], [1, 0], [2, 0], [2, 1], 'L'],
        [[0, 0], [0, 1], [1, 0], [1, 1], 'O'],
        [[0, 0], [1, 0], [1, 1], [2, 1], 'S'],
        [[0, 1], [1, 0], [1, 1], [2, 0], 'Z'],
        [[0, 0], [1, 0], [2, 0], [3, 0], 'I']
    ];
    return (
        blocks[Math.floor(Math.random() * 7)]
        // blocks[3]
    );
}


/* 渲染函数，收到一个state、setState和一个坐标数组，执行渲染操作，返回当前的形状位置 */
const main = (
    arr: Block,
    setArr: Function, dir: Array<Array<number> | string>,
    n: 0 | 1) => {
    const CopyDir = JSON.parse(JSON.stringify(dir));
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = CopyDir; // 解构坐标
    setArr(() => {
        /* 全部初始化 */
        let temArr = [...arr];
        temArr[x1 as number][y1 as number] = n;
        temArr[x2 as number][y2 as number] = n;
        temArr[x3 as number][y3 as number] = n;
        temArr[x4 as number][y4 as number] = n;
        return temArr;
    })
    return CopyDir;
}

/* 方法：清除行 */
const clearRow = (
    arr: Block,
    setArr: Function,
    x: number) => {
    /* 清除x行 */
    setArr(() => {
        let tem = [...arr];
        let list: Array<Array<number>> = [];
        let unlist: Array<Array<number>> = [];
        for (let i = x - 1; i >= 0; i--) { // 从上到下遍历每一行
            arr[i].map((item, index) => { // 遍历每一项
                if (item) { // 如果该项为 1 ，放入到临时数组中
                    list.push([i, index]);
                } else {
                    unlist.push([i, index]);
                }
            })
        }
        list.forEach(item => {
            let [x, y] = item;
            tem[x][y] = 0;
            tem[x + 1][y] = 1;
        });
        unlist.forEach(item => {
            let [x, y] = item;
            tem[x + 1][y] = 0;
        });

        return tem;
    })
}
export { getType, main, clearRow };