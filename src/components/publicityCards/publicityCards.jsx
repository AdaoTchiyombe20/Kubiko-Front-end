import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './publicityCards.module.css'
export default function PublicityCards(props) {
  return (
    <Card className={`${styles.card} col `}>
      <Card.Header className={`${styles.cardHeader} border-0 pt-3`} as="h5">
        <div className='d-flex align-items-center justify-content-center rounded-circle'>
            {props.icon}
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text className={`${styles.cardText} text-secondary`}>
          {props.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}