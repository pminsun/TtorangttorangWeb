export default function GuideMent(props) {
  const { order, firstMent, secondMent } = props;
  return (
    <div className="guideMent">
      <div className="order_box">
        <p>{order}</p>
      </div>
      <div className="ment_box">
        <p>{firstMent}</p>
        <p>{secondMent}</p>
      </div>
    </div>
  );
}
