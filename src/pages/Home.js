import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BarChartLine, JournalBookmarkFill, PlusSlashMinus } from 'react-bootstrap-icons';
import ReactTypingEffect from 'react-typing-effect';
import Logo from '../images/Budgetedfull.png'




const Home = props => {

  const [transactions, setTransactions] = useState([])
  const [editTable, showEditTable] = useState('')
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);

  const getTransactions = () => {
    axios.get('https://glacial-journey-00163.herokuapp.com/api/transactions')
      .then(
        (response) => setTransactions(response.data),
        (error) => console.error(error))
      .catch()

  }

      const handleUpdate = (editTransaction) => {
    axios.put('https://glacial-journey-00163.herokuapp.com/api/transactions/' + editTransaction.id, editTransaction)
      .then((response) => {
        setTransactions(transactions.map((transaction) => {
          return transaction.id !== editTransaction.id ? transaction : editTransaction
        }))
      })
  }

    const handleDelete = (e) => {
    axios.delete('https://glacial-journey-00163.herokuapp.com/api/transactions/' + e.target.value)
      .then((response) => {
        getTransactions()
      })
  }

    useEffect(() => {
    getTransactions()
  }, [])
  
    return (
<>

    <section id="hero">
    
    <div id="logo"><img src={Logo} alt="" /></div>
    <div>
<ReactTypingEffect
        text={["Budget", "Track Expenses", "Build Credit"]}
        cursorRenderer={cursor => <h1>{cursor}</h1>}
        displayTextRenderer={(text, i) => {
          return (
            <h1 className="heroText">
              The Best App To Help You {text}
            </h1>
          );
        }}        
      />
      </div>
    </section>


  <section id="cards">
    <Container>
    <h1 className="py-5 title">Easy. Simple. Free.</h1>
      <Row>
      <Col md="4" sm="12">
      
              <Card>
                <Card.Img variant="top"  />
                <Card.Body>
                  <Card.Title className="mb-4"><BarChartLine color='#1f83bd' className="center" size={70} /></Card.Title>
                  <Card.Title className="bold" >Budget Analytics</Card.Title>
                  <Card.Text className="center">
                    View charts and analytics for various categories and budgets. See exactly how your spending is trending over time, and make adjustments to suit you and your families lifestyle.
                  </Card.Text>
                </Card.Body>
                <Card.Body className="center end">
                </Card.Body>
              </Card>
        </Col>
        <Col md="4" sm="12">
                <Card >
                  <Card.Img variant="top"  />
                  <Card.Body>
                    <Card.Title className="mb-4"><JournalBookmarkFill color='#1f83bd' className="center" size={70} /></Card.Title>
                    <Card.Title className="bold">Store Transactions</Card.Title>
                    <Card.Text className="center">
                      Store every detail about each of your transactions. Date, Vendor, Cost, and any Details or Notes you'd like to add! Direct transactions from credit cards and bank accounts expected in early 2033.
                    </Card.Text>
                  </Card.Body>
                  <Card.Body className="center end">
                </Card.Body>
                </Card>
        </Col>
        <Col md="4" sm="12">
            <Card >
            <Card.Img variant="top"  />
                <Card.Body>
                  <Card.Title className="mb-4"><PlusSlashMinus color='#1f83bd' className="center" size={70} /></Card.Title>
                  <Card.Title className="bold">Credits/Debits</Card.Title>
                  <Card.Text className="center">
                    See where your money is going in one simple view. Build healthy spending habits to save more. See which categories are problem areas for your budget, and where you're doing well! 
                  </Card.Text>
                </Card.Body>
                <Card.Body className="center end">
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  </section>
</>
    )
}

export default Home

