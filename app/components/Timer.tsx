import styles from "./timer.module.css";

export default function Timer({
  currentTime,
  isStudying,
}: {
  currentTime: number;
  isStudying: boolean;
}) {
  const colorStyles = {
    border: `4px solid ${isStudying ? "rgb(255, 44, 79)" : "rgb(0, 0, 150)"}`,
    color: `${isStudying ? "rgb(255, 44, 79)" : "rgb(0, 0, 150)"}`,
  };

  return (
    <div style={colorStyles} className={styles.timer}>
      <span>
        {Math.floor(currentTime / 60) < 10 ? `0${Math.floor(currentTime / 60)}` : Math.floor(currentTime / 60)}
      </span>
      <span>:</span>
      <span>
        {currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60}
      </span>
    </div>
  );
}
