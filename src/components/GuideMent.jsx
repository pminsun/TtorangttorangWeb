export default function GuideMent(props) {
  const { firstMent, secondMent } = props;
  return (
    <div className="ment_box">
      <p>{firstMent}</p>
      <p>{secondMent}</p>
    </div>
  );
}
