import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import Table from './table';

const BookChart = (props) => {

    return (
    <React.Fragment>
        <h1 style={{textAlign:'center',margin : '35px'}}>{props.name}</h1>
     <div className='home'>
          <div>
            <PieChart width={400} height={400}>
                    <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={props.data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                    />
                    <Tooltip />
            </PieChart>
          </div>
          <div>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Number Of Books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                props.tableData.map(book => 
                                    (
                                        book.map( category => 
                                            category.map( table =>
                                                <tr key={table['name']}>
                                                    <td>
                                                        {table['name']}
                                                    </td>
                                                    <td>
                                                        {table['value']}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )
                                )
                        }
                    </tbody>
                </table> 
          </div>
     </div>
     </React.Fragment>
    );
  }

  export default BookChart;
  /*
  
  */