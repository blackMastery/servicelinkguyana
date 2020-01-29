import Table from 'react-bootstrap/Table'
import styled from 'styled-components';

const Wrap = styled.div`
  overflow-x: auto;
  width: 100%;
  height: 100%;
`



export default ({list}) => {

    return (
      <Wrap>

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
      <th>propose cost</th>
      <th>Duration</th>
      <th>proposal sent</th>
      <th>payment Style</th>
      <th>experience Level</th>
    </tr>
  </thead>
  <tbody>
    {
     list.map((item)=>(
        <tr>
            <td>{item.title}</td>
            <td>{item.cost}</td>
            <td>{item.rate}</td>
            <td>{item.est}</td>
            <td>{item.createdAt}</td>
            <td>{item.paymentStyle}</td>
            <td>{item.experienceLevel}</td>
        </tr>

     ))
      
}  
</tbody>
</Table>
</Wrap>
    )
}