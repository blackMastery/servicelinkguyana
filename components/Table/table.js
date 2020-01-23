import Table from 'react-bootstrap/Table'




export default ({list}) => {

    return (
    <Table striped bordered hover variant="dark">
  <thead>
    <style jsx>{`
      th {
        text-transform: capitalize;
      }
    `}</style>
    <tr>
      <th>title</th>
      <th>cost</th>
      <th>payment Style</th>
      <th>created At</th>
      <th>experience Level</th>
      <th>est</th>
      <th>hour Rate</th>
    </tr>
  </thead>
  <tbody>
    {
     list.map((item)=>(
        <tr>
            <td>{item.title}</td>
            <td>{item.cost}</td>
            <td>{item.paymentStyle}</td>
            <td>{item.createdAt}</td>
            <td>{item.experienceLevel}</td>
            <td>{item.est}</td>
            <td>{item.hourRate}</td>
        </tr>

     ))
      
}  
</tbody>
</Table>
    )
}