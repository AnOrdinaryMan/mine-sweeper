import React from 'react';

import './index.css'

class Index extends React.Component {
    constructor () {
        super();
        this.state = {
            // 行数
            row: 10,
            // 列数
            column: 10,
            // 雷数
            mineCount: 10,
            // 表格
            table: [[]]
        }
    }

    componentWillMount () {
        // 表格初始化
        let table = new Array(this.state.row).fill(null);
        table = table.map(() => new Array(this.state.column).fill(null));
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                let obj = Object.create(null);

                obj.selected = false; // 是否已点击
                obj.hasMine = false; // 是否藏有地雷
                obj.hasFlag = false; // 是否标记旗子
                obj.number = 0; // 九宫格内地雷的数量

                table[i][j] = obj;
            }
        }

        // 随机布雷 💣
        let mineCount = this.state.mineCount;
        while (mineCount) {
            let randomRow = Math.floor(Math.random() * this.state.row);
            let randomColumn = Math.floor(Math.random() * this.state.column);
            if (table[randomRow][randomColumn].hasMine) {
                continue;
            }
            table[randomRow][randomColumn].hasMine = true;
            mineCount--;
        }

        // 生成九宫格内地雷的数量
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                // 若此格为地雷，跳过
                if (table[i][j].hasMine) {
                    continue;
                }
                // 遍历九宫格
                for (let m = i - 1; m <= i + 1; m++) {
                    for (let n = j - 1; n <= j + 1; n++) {
                        // 处理边界情况
                        if (m < 0 || m >= this.state.row || n < 0 || n >= this.state.column) {
                            continue;
                        }
                        if (table[m][n].hasMine) {
                            table[i][j].number += 1;
                        }
                    }
                }
            }
        }

        this.setState({
            table: table
        }, () => { console.log(this.state.table) });
    }

    onMouseUp (row, column, e) {
        console.log(row, column);
        let temp = this.state.table;

        if (e.button === 2) { // 右击标记旗子
            // 若已左击过，无法标记旗子
            if (temp[row][column].selected === false) {
                temp[row][column].hasFlag = !temp[row][column].hasFlag;
            }
        } else { // 左击
            // 若已左击过，无法左击
            // 若已标记旗子，无法左击
            if (temp[row][column].selected === false && temp[row][column].hasFlag === false) {
                // 击中地雷，游戏结束
                if (temp[row][column].hasMine) {
                    for (let i = 0; i < temp.length; i++) {
                        for (let j = 0; j < temp[i].length; j++) {
                            temp[i][j].hasFlag = false;
                            temp[i][j].selected = true;
                        }
                    }
                    e.target.style.backgroundColor = '#F56C6C';
                } else { // 未击中地雷
                    // 击中空方块，快进，以该空方快为中心快速扫雷打开一片空区域
                    if (temp[row][column].number === 0) {
                        this.fastForward(row, column, temp);
                    } else { // 击中数字块
                        temp[row][column].selected = true;
                    }
                }
            }
        }
        
        this.setState({
            table: temp
        })
    }

    // 快进，若左击到一个空方块，以该空方快为中心快速扫雷打开一片空区域
    fastForward (row, column, table) {
        // 若为雷，结束递归
        if (table[row][column].hasMine) {
            return;
        }
        // 若已点击，结束递归
        if (table[row][column].selected) {
            return;
        }
        // 若已标记旗子，结束递归
        if (table[row][column].hasFlag) {
            return;
        }
        
        table[row][column].selected = true;
        
        // 若number > 0，结束递归
        if (table[row][column].number !== 0) {
            return;
        }
        
        // 遍历九宫格
        for (let m = row - 1; m <= row + 1; m++) {
            for (let n = column - 1; n <= column + 1; n++) {
                // 处理边界情况
                if (m < 0 || m >= this.state.row || n < 0 || n >= this.state.column) {
                    continue;
                }
                this.fastForward(m, n, table);
            }
        }
    }

    render () {
        let mineSweeperRow = this.state.table.map((row, rowIndex) => {
            return (
                <div className='mine-sweeper-row' key={'row' + rowIndex}>
                    {
                        row.map((item, columnIndex) => {
                            return (
                                <div 
                                    className={
                                        item.selected 
                                        ? 'mine-sweeper-item mine-sweeper-item-selected' 
                                        : 'mine-sweeper-item'
                                    } 
                                    key={'row' + rowIndex + '-column' + columnIndex}
                                    onMouseUp={(e) => this.onMouseUp(rowIndex, columnIndex, e)}
                                >
                                    {
                                        item.hasFlag ? '🚩' : null
                                    }
                                    {
                                        item.selected
                                        ?
                                            item.hasMine
                                            ? '💣'
                                            :
                                            <span className={'mine-sweeper-item-number-' + item.number}>
                                                {item.number !== 0 ? item.number : null}
                                            </span>
                                        : null
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )
        })

        return (
            <div className='mine-sweeper' onContextMenu={(e) => {e.preventDefault()}}>
                {mineSweeperRow}
            </div>
        )
    }
}

export default Index;