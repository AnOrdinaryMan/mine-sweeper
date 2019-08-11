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
            table: [[]],
            // 旗子数
            flagCount: 0,
            // 保存爆炸的地点
            boomRow: -1,
            boomColumn: -1
        };

        // 计时器，实现移动端长按事件
        this.timer = 0;
    }

    init () {
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
            table: table,
            flagCount: 0,
            boomRow: -1,
            boomColumn: -1
        }, () => { console.log(this.state.table) });
    }

    componentWillMount () {
        this.init();
    }

    // 重新开始
    restart = () => {
        this.init();
    }

    // 修改行数
    onRowChange (e) {
        if (isNaN(parseInt(e.target.value))) {
            this.setState({
                row: 1,
                mineCount: 1
            }, () => {
                this.init();
            });
        } else {
            if (parseInt(e.target.value) > 99) {
                alert('行数不能超过99！');
                return;
            }
            if (parseInt(e.target.value) === 0) {
                alert('行数不能为0！');
                return;
            }
            if (String(parseInt(e.target.value)).length !== e.target.value.length) {
                return;
            }
            this.setState({
                row: parseInt(e.target.value),
                mineCount: 1
            }, () => {
                this.init();
            });
        }
    }

    // 修改列数
    onColumnChange (e) {
        if (isNaN(parseInt(e.target.value))) {
            this.setState({
                column: 1,
                mineCount: 1
            }, () => {
                this.init();
            });
        } else {
            if (parseInt(e.target.value) > 99) {
                alert('列数不能超过99！');
                return;
            }
            if (parseInt(e.target.value) === 0) {
                alert('列数不能为0！');
                return;
            }
            if (String(parseInt(e.target.value)).length !== e.target.value.length) {
                return;
            }
            this.setState({
                column: parseInt(e.target.value),
                mineCount: 1
            }, () => {
                this.init();
            });
        }
    }

    // 修改雷数
    onMineCountChange (e) {
        if (isNaN(parseInt(e.target.value))) {
            this.setState({
                mineCount: 1
            }, () => {
                this.init();
            });
        } else {
            if (parseInt(e.target.value) > this.state.row * this.state.column) {
                alert('雷数不能超过格子的数量！');
                return;
            }
            this.setState({
                mineCount: parseInt(e.target.value)
            }, () => {
                this.init();
            });
        }
    }

    // 判断是否胜利
    ifWin (table) {
        let count = 0;
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                if (table[i][j].selected) {
                    count++;
                }
            }
        }
        if (count === this.state.row * this.state.column - this.state.mineCount) {
            return true;
        } else {
            return false;
        }
    }

    // 移动端长按标记旗子
    onTouchStart (row, column, e) {
        console.log(row, column);
        let temp = this.state.table;
        this.timer = setTimeout(() => {
            // 若已左击过，无法标记旗子
            if (temp[row][column].selected === false) {
                if (temp[row][column].hasFlag) {
                    this.setState({
                        flagCount: this.state.flagCount - 1
                    })
                } else {
                    this.setState({
                        flagCount: this.state.flagCount + 1
                    })
                }
                temp[row][column].hasFlag = !temp[row][column].hasFlag;
            }
            this.setState({
                table: temp
            })
        }, 500);
    }
    onTouchEnd () {
        clearTimeout(this.timer);
    }

    onClick (row, column, e) {
        console.log(row, column);
        let temp = this.state.table;

        if (e.button === 2) { // 右击标记旗子
            // 若已左击过，无法标记旗子
            if (temp[row][column].selected === false) {
                if (temp[row][column].hasFlag) {
                    this.setState({
                        flagCount: this.state.flagCount - 1
                    })
                } else {
                    this.setState({
                        flagCount: this.state.flagCount + 1
                    })
                }
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
                    // 记录爆炸的地点
                    this.setState({
                        boomRow: row,
                        boomColumn: column
                    })

                    setTimeout(() => {
                        alert('💣💣💣 Boom ！！！');
                    });
                } else { // 未击中地雷
                    // 击中空方块，快进，以该空方快为中心快速扫雷打开一片空区域
                    if (temp[row][column].number === 0) {
                        this.fastForward(row, column, temp);
                    } else { // 击中数字块
                        temp[row][column].selected = true;
                    }
                    // 胜利 
                    if (this.ifWin(temp)) {
                        for (let i = 0; i < temp.length; i++) {
                            for (let j = 0; j < temp[i].length; j++) {
                                temp[i][j].hasFlag = false;
                                temp[i][j].selected = true;
                            }
                        }
                        this.setState({
                            flagCount: 0
                        });
                        setTimeout(() => {
                            alert('🚩🚩🚩 Win ！！！');
                        });
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
        let mineSweeperTable = this.state.table.map((row, rowIndex) => {
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
                                    onMouseUp={(e) => this.onClick(rowIndex, columnIndex, e)}
                                    onTouchStart={(e) => this.onTouchStart(rowIndex, columnIndex, e)}
                                    onTouchEnd={() => this.onTouchEnd()}
                                    style={
                                        rowIndex === this.state.boomRow && columnIndex === this.state.boomColumn
                                        ? {backgroundColor: '#F56C6C'}
                                        : null
                                    }
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
            <div>
                <div className='mine-sweeper-start'>
                    <span className='mine-sweeper-start-btn' onClick={this.restart}>
                        重新开始
                    </span>
                </div>
                <div className='mine-sweeper-flagCount'>
                    {'🚩 X ' + this.state.flagCount}
                </div>
                <div className='mine-sweeper-params'>
                    <span className='mine-sweeper-params-item mine-sweeper-params-item-1'>
                        行数：
                        <input onChange={(e) => this.onRowChange(e)} value={this.state.row} />
                    </span>
                    <span className='mine-sweeper-params-item mine-sweeper-params-item-2'>
                        列数：
                        <input onChange={(e) => this.onColumnChange(e)} value={this.state.column} />
                    </span>
                    <span className='mine-sweeper-params-item mine-sweeper-params-item-3'>
                        雷数：
                        <input onChange={(e) => this.onMineCountChange(e)} value={this.state.mineCount} />
                    </span>
                </div>
                <div 
                    className='mine-sweeper' 
                    onContextMenu={(e) => {e.preventDefault()}}
                    style={{width: this.state.column * 30, height: this.state.row * 30}}
                >
                    {mineSweeperTable}
                </div>
            </div>
        )
    }
}

export default Index;