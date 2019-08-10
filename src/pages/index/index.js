import React from 'react';

import './index.css'

class Index extends React.Component {
    constructor () {
        super();
        this.state = {
            row: 10,
            column: 10,
            mineCount: 10,
            table: [[]]
        }
    }

    componentWillMount () {
        let table = new Array(this.state.row).fill(null);
        table = table.map(() => new Array(this.state.column).fill(null));
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                let obj = Object.create(null);

                obj.selected = false;
                obj.number = 0;
                obj.hasFlag = false;

                table[i][j] = obj;
            }
        }
        this.setState({
            table: table
        }, () => { console.log(this.state.table) });
    }

    onMouseUp (row, column, e) {
        console.log(row, column);
        let temp = this.state.table;
        if (e.button === 2) {
            if (temp[row][column].selected === false) {
                temp[row][column].hasFlag = !temp[row][column].hasFlag;
            }
        } else {
            if (temp[row][column].hasFlag === false) {
                temp[row][column].selected = true;
            }
        }
        
        this.setState({
            table: temp
        })
    }

    render () {
        let mineSweeperRow = this.state.table.map((row, rowIndex) => {
            return (
                <div onContextMenu={(e) => {e.preventDefault()}}>
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
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })

        return (
            <div className='mine-sweeper'>
                {mineSweeperRow}
            </div>
        )
    }
}

export default Index;