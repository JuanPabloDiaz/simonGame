import PropTypes from "prop-types";

const Button = ({ color, onPress }) => {
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
  };

  return (
    <button
      className={`m-2 h-24 w-24 ${colorClasses[color]}`}
      onClick={onPress}
    />
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["red", "green", "blue", "yellow"]).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
