export default function Timer({
  currentTime,
  isStudying,
}: {
  currentTime: number;
  isStudying: boolean;
}) {
  const styles = {
    padding: "40px 80px",
    border: `4px solid ${isStudying ? "rgb(255, 44, 79)" : "rgb(0, 0, 150)"}`,
    fontSize: "4rem",
    color: `${isStudying ? "rgb(255, 44, 79)" : "rgb(0, 0, 150)"}`,
  };

  return (
    <div style={styles}>
      {Math.floor(currentTime / 60)}:
      {currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60}
    </div>
  );
}
