import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';

function orAndButton() {
  return (
    <Container>
      <Row>
      <Col xs lg="3"></Col>
      <Col xs lg="6">
        {/* Or with a dash line */}
          <div
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            >
            <div style={{flex: 1, height: '2px', backgroundColor: '#96A1BB'}} />

            <div>
              <p data-testid="or-1" style={{color: "#96A1BB", width: '70px', marginTop: "12px", textAlign: 'center'}}>OR</p>
            </div>

            <div style={{flex: 1, height: '2px', backgroundColor: '#96A1BB'}} />
          </div>
        {/* Button */}
        <Button data-testid="button-1" variant="contained px-5 py-3" style={{fontSize: "32px", color:"white", backgroundColor: "#6749F5", textTransform: "unset", boxShadow: "none"}}>Browse File</Button>
      </Col>
      <Col xs lg="3"></Col>
      </Row>
    </Container>
  )
}

export default orAndButton


