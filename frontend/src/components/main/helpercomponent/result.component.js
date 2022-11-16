import "./result.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function result(props) {
  const filestatus = props.props[1]
  const timeUsed = filestatus.Elapsed
  return (
    
    <Container>
    {/* Time used */}
    <div className="result mb-5">
      <div style={{paddingBottom:"15px"}}>
        <p data-testid="resulttitle-1" style={{textAlign:"left", fontSize:"36px"}}>Total {filestatus.Total} Websites</p>
        {Math.round(timeUsed) < 60 ? (
          <p data-testid="second-1" style={{textAlign:"left", fontSize:"24px"}}>(Used {Math.round(timeUsed)} second)</p>
        ) : (
          <p data-testid="minute-1" style={{textAlign:"left", fontSize:"24px"}}>(Used {Math.floor(timeUsed/60)} minute {Math.floor(timeUsed % 60)} second)</p>
        )}
      </div>
      {/* up and down status */}
      <Row>
        <Col className="resultup">
          <p data-testid="up-1" style={{textAlign: "left", marginBottom:"0px", fontSize: "24px"}}> UP </p>
          <span data-testid="up-2" className="numbers">{filestatus.up}</span>
        </Col>
        <Col className="resultdown">
        <p data-testid="down-1" style={{textAlign: "left", marginBottom:"0px", fontSize: "24px"}}> DOWN </p>
        <span data-testid="down-2" className="numbers">{filestatus.down}</span>
        </Col>
      </Row>
    </div>
    </Container>
  )
}

export default result