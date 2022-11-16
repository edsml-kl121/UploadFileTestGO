import "./loadingbar.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import csv from '../../../images/csv.png';

function loadingbar(props) {
  const path = props.props[0]
  const current = props.props[1]
  return (
  <div className="loadzone mb-5">
  <Container>
    <Row>
      {/* csv logo */}
      <Col xs lg="2">
        <img src={csv} alt="csv" style={{height:"80px"}}></img>
      </Col>
      <Col lg="1">
      </Col>
      {/* percentage data */}
      <Col xs lg="8">
        <p data-testid="path-1" style={{textAlign:"left"}}>
            {path}
          <span data-testid="progress-1" style={{float:"right"}}>
            {isNaN(current) ? 0 : Math.round(current)}%
          </span>
        </p>
        {/* The progress bar */}
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{width:props.props[1] + "%", backgroundColor: '#6749F5'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </Col>
    </Row>

  </Container>
  </div>

  )
}

export default loadingbar


