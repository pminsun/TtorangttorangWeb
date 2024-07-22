export default function GuideMent(props) {
  const { firstMent, secondMent } = props;
  return (
    <div className="guideMent">
      <div className="character_box"></div>
      <div className="ment_box">
        <p>{firstMent}</p>
        <p>{secondMent}</p>
      </div>
    </div>
  );
}
