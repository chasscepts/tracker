import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFeedback, selectFeedbacks } from '../reducers/feedbackSlice';
import { COLORS } from '../utilities';

const styles = {
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '300px',
    height: '150px',
    overflow: 'hidden',
  },
  feedback: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#d8dfe4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    right: '3px',
    top: '3px',
    padding: 0,
    border: 'none',
    color: COLORS.red,
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  error: {
    color: COLORS.red,
  },
  success: {
    color: COLORS.success,
  },
  info: {
    color: COLORS.gray,
  },
};

function Feedback({ feedback }) {
  const dispatch = useDispatch();

  const { message, type } = feedback.payload;

  const style = styles[type] || styles.info;

  const close = () => dispatch(removeFeedback(feedback.id));

  return (
    <div style={{ ...styles.feedback, ...style }}>
      <div><span>{message}</span></div>
      <button style={styles.btn} type="button" onClick={close}>X</button>
    </div>
  );
}

Feedback.propTypes = {
  feedback: PropTypes.shape({
    id: PropTypes.number.isRequired,
    payload: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
};

export default function Feedbacks() {
  const feedbacks = useSelector(selectFeedbacks);

  if (feedbacks.length <= 0) return <></>;

  return (
    <div style={styles.container}>
      {feedbacks.map((feedback) => <Feedback key={feedback.id} feedback={feedback} />)}
    </div>
  );
}
