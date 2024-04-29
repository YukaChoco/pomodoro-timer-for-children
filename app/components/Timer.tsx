import styles from "./timer.module.css";

export default function Timer({
  currentTime,
  isStudying,
}: {
  currentTime: number;
  isStudying: boolean;
}) {
  const colorStyles = {
    border: `4px solid ${isStudying ? "rgb(6, 73, 20)" : "rgb(6, 73, 20)"}`,
    backgroundColor: isStudying ? "rgb(6, 73, 20)" : "rgb(192, 236, 197)",
    color: isStudying ? "white" : "rgb(6, 73, 20)",
  };

  return (
    <div style={colorStyles} className={styles.timer}>
      <span>
        {Math.floor(currentTime / 600) < 10
          ? "0"
          : Math.floor(currentTime / 600)}
      </span>
      <span>{Math.floor((currentTime / 60) % 10)}</span>
      <span>:</span>
      <span>
        {currentTime % 60 < 10 ? "0" : Math.floor((currentTime % 60) / 10)}
      </span>
      <span>{(currentTime % 60) % 10}</span>
    </div>
  );
}
