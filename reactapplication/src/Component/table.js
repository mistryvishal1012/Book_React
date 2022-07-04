const Table = (props) => {


    return ( 
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Number Of Books</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map( category => (
                        console.log(category)
                    ) 
                    )
                }
            </tbody>
        </table> 
    );
}
 
export default Table;