import React from 'react';

import './index.css'

class Index extends React.Component {
    constructor () {
        super();
        this.state = {
            row: 10,
            column: 10,
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
                table[i][j] = obj;
            }
        }
        this.setState({
            table: table
        }, () => { console.log(this.state.table) });
    }

    onClick (row, column) {
        console.log(row, column);
        let temp = this.state.table;
        temp[row][column].selected = true;
        this.setState({
            table: temp
        }, () => { console.log(this.state.table[row]) })
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
                                        this.state.table[rowIndex][columnIndex].selected 
                                        ? 'mine-sweeper-item mine-sweeper-item-selected' 
                                        : 'mine-sweeper-item'
                                    } 
                                    key={'row' + rowIndex + '-column' + columnIndex}
                                    onClick={() => this.onClick(rowIndex, columnIndex)}
                                >
                                </div>
                            )
                        })
                    }
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