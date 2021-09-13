const styles = {
  container: {
    width: '100%',
    padding: '15px',
    textAlign: 'center',
  },
};

const formattedDate = (() => {
  const today = new Date();
  return today.toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );
})();

export default function DatePanel() {
  return (
    <div style={styles.container}>
      {formattedDate}
    </div>
  );
}
