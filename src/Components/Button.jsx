import PropTypes from "prop-types";

const Button = ({ color, onPress }) => {
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
  };

  return (
    <button className={`h-60 w-60 ${colorClasses[color]}`} onClick={onPress} />
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["red", "green", "blue", "yellow"]).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
